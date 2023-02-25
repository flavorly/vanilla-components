// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { Request } from 'miragejs'
import { Factory, Model, createServer } from 'miragejs'
import { Pagination } from 'paginatedjs'
import { faker } from '@faker-js/faker'
import orderBy from 'lodash/orderBy'
import each from 'lodash/each'
import Fuse from 'fuse.js'
import collect from 'collect.js'

/** Fake a look a like Laravel Pagination */
const paginate = (records: Record<string, any>[], request: Request, baseUrl: string) => {
    if (!request || typeof window === 'undefined' || typeof document === 'undefined' || import.meta.env.SSR) {
      return
    }

    const postData = JSON.parse(request.requestBody)

    if (postData) {
      console.log('[REST] Got Post from Fake API', postData)
    }

    // Search the items function
    const search = (query: string, collection: ReadonlyArray<unknown>) => {
        const options = {
            includeScore: false,
            threshold: 0.3,
            keys: [
                'id',
                'gateway',
                'amount',
                'status',
            ],
        }

        const fuse = new Fuse(collection, options)
        const results = fuse.search(query)
        const filtered = [] as string[]

        each(results, (result: object) => {
            filtered.push(result.item)
        })

        return filtered
    }

    const filterRecords = (filters: object, collection: ReadonlyArray<unknown>) => {
        let ourCollection = collect(collection)

        Object.entries(filters).forEach(([key, value]) => {
            ourCollection = ourCollection.where(key, value)
        })

        return ourCollection.all()
    }

    // Search the items
    const searchQuery = request.queryParams.search || postData.search || null
    if (searchQuery !== null) {
        console.log('[REST] 🔍 Searching', searchQuery)
        records = search(searchQuery, records)
    }

    const userFilters = request.queryParams.filters || postData.filters || null
    if (userFilters !== null && Object.keys(userFilters).length > 0) {
        console.log('[REST] ⛵ Filtering', userFilters)
        records = filterRecords(userFilters, records)
    }

    const total = records.length
    const perPage = Number(request.queryParams.perPage || postData.perPage || 0)
    const page = Number(request.queryParams.page || 1)

    const paginationInstance = new Pagination(records, perPage)

    paginationInstance.goToPage(page)

    const hasNextPage = paginationInstance.hasMore()
    const hasPreviousPage = paginationInstance.pageNumber > 1
    const nextPage = paginationInstance.pageNumber + 1
    const previousPage = paginationInstance.pageNumber - 1
    let items = paginationInstance.getPaginated(true)
    const totalPages = paginationInstance.nbPages
    const showingFrom = (Number(page) - 1) * Number(perPage)
    const showTo = showingFrom + perPage

    // Apply Sorting
    if (postData.sorting) {
        const pluckColumns = postData.sorting.map(a => a.column)
        const pluckDirections = postData.sorting.map(a => a.direction)
        items = orderBy(items, pluckColumns, pluckDirections)
        console.log('[REST] 👉 Sorting, Demo only supports', pluckColumns, pluckDirections)
    }

    const generateUrl = (params: object) => {
      try {
        const userUrl = new URL(baseUrl)
        const urlParams = new URLSearchParams(userUrl.search)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        Object.keys(params).forEach(key => urlParams.set(key, params[key]))
        userUrl.search = urlParams.toString()
        return userUrl
      }
      catch (e) {
        return '/datatables'
      }
    }

    // Apply Filters
    const pagesList = []
    for (let i = 1; i < totalPages; i++) {
        pagesList.push({
            url: generateUrl({ page: i.toString() }),
            label: i,
            active: i === page,
        })
    }

    return {
        data: items,
        links: {
            next: hasNextPage ? generateUrl({ page: nextPage.toString() }) : null,
            previous: hasPreviousPage ? generateUrl({ page: previousPage.toString() }) : null,
            pages: pagesList,
        },
        meta: {
            current_page: page,
            from: showingFrom,
            to: showTo,
            total,
        },
        responses: {},
    }
}

export function makeServer({ environment = 'development' } = {}) {
    return createServer({
        environment,
        logging: false,
        trackRequests: false,
        models: {
            payment: Model,
        },
        useDefaultPassthroughs: true,
        factories: {
            payment: Factory.extend({
                id(i) {
                    return i
                },
                gateway(i) {
                    return faker.helpers.arrayElement(['Paypal', 'Bank Transfer', 'Credit Card', 'Bitcoin', 'Ethereum'])
                },
                amount(i) {
                    return `${faker.datatype.number({ min: 10, max: 230 })}€`
                },
                status(i) {
                    return faker.helpers.arrayElement(['Completed', 'Pending', 'Refunded'])
                },
            }),
        },
        seeds(server) {
            server.createList('payment', 1000)
        },
        routes() {
            this.post('/datatables', (schema, request) => {
                return paginate(
                    schema.db.payments,
                    request,
                    '/datatables',
                )
            })
            this.passthrough('https://www.omdbapi.com', 'https://hybridly.test/*')
        },
    })
}
