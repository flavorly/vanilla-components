<?php

$scan = scandir('./svg');

$files = array_filter($scan, function ($file) {
    return $file !== '.' && $file !== '..';
});

foreach ($files as $key =>$file ) {
    if ($key > 2) {
//        continue;
    }
    $flagSvg = file_get_contents("./svg/{$file}");
    $flagSvg = str_replace("\n", " ", $flagSvg);
    $iso2 = strtoupper(str_replace('.svg', '', $file));
    $addSvg = "<span v-if=\"iso === '{$iso2}'\"> {$flagSvg} </span>";

    $content = str_replace(
        "###\n",
        $addSvg . "\n    ###\n",
        file_get_contents("./Index.vue")
    );

    file_put_contents("./Index.vue", $content);
}

$content = str_replace("###", '', file_get_contents("./Index.vue"));
$content = str_replace('xmlns="http://www.w3.org/2000/svg"', '', $content);
$content = str_replace('xmlns:xlink="http://www.w3.org/1999/xlink"', '', $content);
$content = str_replace('<svg ', '<svg v-bind="$attrs" ', $content);
file_put_contents("./Index.vue", $content);

//print_r($files);
