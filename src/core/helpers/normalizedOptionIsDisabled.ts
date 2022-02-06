import { NormalizedOption } from '../types';

const normalizedOptionIsDisabled = (option: NormalizedOption): boolean => option.disabled === true || option.disabled === 'disabled';

export default normalizedOptionIsDisabled;
