<?php

$scan = scandir('./svg');

$files = array_filter($scan, function ($file) {
    return $file !== '.' && $file !== '..';
});

foreach ($files as $key =>$file ) {
    if ($key > 2) {
        continue;
    }
    $flagSvg = file_get_contents("./svg/{$file}");
    $iso2 = strtoupper(str_replace('.svg', '', $file));
    $addSvg = "<span v-if=\"iso === '{$iso2}'\"> {$flagSvg} </span>";

    $content = str_replace(
        "###\n",
        $addSvg . "\n    ###\n",
        file_get_contents("./Index.vue")
    );

    file_put_contents("./Index.vue", $content);
}

//print_r($files);
