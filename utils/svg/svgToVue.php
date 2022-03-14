<?php

$folder = 'Flags';
$scan = scandir('./'.$folder);
$files = array_filter($scan, function ($file) {
    return $file !== '.' && $file !== '..';
});

$lines = [];
$topLines = [];
$lineTemplate = "VanillaFlag%s";
$topImportTemplate = "import %s from './Flags/%s'";
foreach ($files as $key => $file) {

    $flagSvg = file_get_contents("./".$folder."/{$file}");

    $flagSvg = str_replace("\n", " ", $flagSvg);
    $flagSvg = str_replace('<?xml version="1.0" encoding="UTF-8"?>', "", $flagSvg);
    $flagSvg = str_replace('<?xml version="1.0" encoding="utf-8"?>', "", $flagSvg);

    $iso2 = strtoupper(str_replace('.svg', '', $file));
    $iso2 = str_replace('-', '', $iso2);
    $addSvg = "<template>$flagSvg</template>";
    $addSvg = preg_replace('/\>\s+\</m', '><', $addSvg);

    $componentName = sprintf(
        $lineTemplate,
        strtoupper($iso2)
    );

    $lines[] = $componentName;

    $topLines[] = sprintf(
        $topImportTemplate,
        $componentName,
        'Flag'.strtoupper($iso2).'.vue'
    );

    file_put_contents(sprintf("./../../src/components/Icons/Flags/Flag%s.vue",$iso2), $addSvg);
}

$stub = file_get_contents('./BaseComponentFlag.stub');
$stubReplace = str_replace('{{imports}}', implode(",\n", $lines), $stub);
$stubReplace = str_replace('{{topImports}}', implode(";\n", $topLines), $stubReplace);
file_put_contents("./../../src/components/Icons/Flag.vue", $stubReplace);
