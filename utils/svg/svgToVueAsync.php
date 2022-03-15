<?php

$folder = 'Flags';
$scan = scandir('./'.$folder);
$files = array_filter($scan, function ($file) {
    return $file !== '.' && $file !== '..';
});

$lines = [];
$lineTemplate = "'Vanilla-flag-%s': defineAsyncComponent(() => import('./Flags/Flag%s.vue')),";
//$lineTemplate = "const VanillaFlag%s = defineAsyncComponent(() => import('./Flags/Flag%s.vue'));";
foreach ($files as $key => $file) {

    $iso2 = strtoupper(str_replace('.svg', '', $file));
    $iso2 = str_replace('-', '', $iso2);


    $componentName = sprintf(
        $lineTemplate,
        strtolower($iso2),
        $iso2
    );

    $lines[] = $componentName;
}

$stub = file_get_contents('./BaseComponentFlagAsync.stub');
$stubReplace = str_replace('{{imports}}', implode("\n", $lines), $stub);
file_put_contents("./../../src/components/Icons/FlagAsync.vue", $stubReplace);
