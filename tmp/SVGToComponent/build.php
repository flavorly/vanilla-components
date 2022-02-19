<?php

$scan = scandir('./SVG');
$files = array_filter($scan, function ($file) {
    return $file !== '.' && $file !== '..';
});

$lines = [];
$lineTemplate = "'vanilla-flag-%s': defineAsyncComponent(() => import('./Countries/Flag%s.vue'))";
//$lineTemplate = "'vanilla-flag-%s': defineAsyncComponent({loader: () => import('./Countries/Flag%s.vue'), delay: 0,timeout: 1000, errorComponent: FlagErrorComponent,loadingComponent: FlagLoadingComponent})";
foreach ($files as $key => $file) {

    $flagSvg = file_get_contents("./SVG/{$file}");
    $flagSvg = str_replace("\n", " ", $flagSvg);
    $iso2 = strtoupper(str_replace('.svg', '', $file));
    $addSvg = "<template>$flagSvg</template>";
    $addSvg = preg_replace('/\>\s+\</m', '><', $addSvg);

    $lines[] = sprintf(
        $lineTemplate,
        strtolower($iso2),
        $iso2
    );

    file_put_contents(sprintf("./Countries/Flag%s.vue",$iso2), $addSvg);
}

$stub = file_get_contents('./BaseComponentFlag.stub');
$stubReplace = str_replace('{{imports}}', implode(",\n", $lines), $stub);
file_put_contents("./Index.vue", $stubReplace);
