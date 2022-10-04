<script lang="ts">
import { defineComponent } from 'vue'

// Components
import FlagAC from './flags/FlagAC.vue'
import FlagAD from './flags/FlagAD.vue'
import FlagAE from './flags/FlagAE.vue'
import FlagAF from './flags/FlagAF.vue'
import FlagAG from './flags/FlagAG.vue'
import FlagAI from './flags/FlagAI.vue'
import FlagAL from './flags/FlagAL.vue'
import FlagAM from './flags/FlagAM.vue'
import FlagAO from './flags/FlagAO.vue'
import FlagAQ from './flags/FlagAQ.vue'
import FlagAR from './flags/FlagAR.vue'
import FlagAS from './flags/FlagAS.vue'
import FlagAT from './flags/FlagAT.vue'
import FlagAU from './flags/FlagAU.vue'
import FlagAW from './flags/FlagAW.vue'
import FlagAX from './flags/FlagAX.vue'
import FlagAZ from './flags/FlagAZ.vue'
import FlagBA from './flags/FlagBA.vue'
import FlagBB from './flags/FlagBB.vue'
import FlagBD from './flags/FlagBD.vue'
import FlagBE from './flags/FlagBE.vue'
import FlagBF from './flags/FlagBF.vue'
import FlagBG from './flags/FlagBG.vue'
import FlagBH from './flags/FlagBH.vue'
import FlagBI from './flags/FlagBI.vue'
import FlagBJ from './flags/FlagBJ.vue'
import FlagBL from './flags/FlagBL.vue'
import FlagBM from './flags/FlagBM.vue'
import FlagBN from './flags/FlagBN.vue'
import FlagBO from './flags/FlagBO.vue'
import FlagBQ from './flags/FlagBQ.vue'
import FlagBR from './flags/FlagBR.vue'
import FlagBS from './flags/FlagBS.vue'
import FlagBT from './flags/FlagBT.vue'
import FlagBV from './flags/FlagBV.vue'
import FlagBW from './flags/FlagBW.vue'
import FlagBY from './flags/FlagBY.vue'
import FlagBZ from './flags/FlagBZ.vue'
import FlagCA from './flags/FlagCA.vue'
import FlagCC from './flags/FlagCC.vue'
import FlagCD from './flags/FlagCD.vue'
import FlagCF from './flags/FlagCF.vue'
import FlagCG from './flags/FlagCG.vue'
import FlagCH from './flags/FlagCH.vue'
import FlagCI from './flags/FlagCI.vue'
import FlagCK from './flags/FlagCK.vue'
import FlagCL from './flags/FlagCL.vue'
import FlagCM from './flags/FlagCM.vue'
import FlagCN from './flags/FlagCN.vue'
import FlagCO from './flags/FlagCO.vue'
import FlagCR from './flags/FlagCR.vue'
import FlagCU from './flags/FlagCU.vue'
import FlagCV from './flags/FlagCV.vue'
import FlagCW from './flags/FlagCW.vue'
import FlagCX from './flags/FlagCX.vue'
import FlagCY from './flags/FlagCY.vue'
import FlagCZ from './flags/FlagCZ.vue'
import FlagDE from './flags/FlagDE.vue'
import FlagDJ from './flags/FlagDJ.vue'
import FlagDK from './flags/FlagDK.vue'
import FlagDM from './flags/FlagDM.vue'
import FlagDO from './flags/FlagDO.vue'
import FlagDZ from './flags/FlagDZ.vue'
import FlagEC from './flags/FlagEC.vue'
import FlagEE from './flags/FlagEE.vue'
import FlagEG from './flags/FlagEG.vue'
import FlagEH from './flags/FlagEH.vue'
import FlagER from './flags/FlagER.vue'
import FlagES from './flags/FlagES.vue'
import FlagET from './flags/FlagET.vue'
import FlagEU from './flags/FlagEU.vue'
import FlagFI from './flags/FlagFI.vue'
import FlagFJ from './flags/FlagFJ.vue'
import FlagFK from './flags/FlagFK.vue'
import FlagFM from './flags/FlagFM.vue'
import FlagFO from './flags/FlagFO.vue'
import FlagFR from './flags/FlagFR.vue'
import FlagGA from './flags/FlagGA.vue'
import FlagGB from './flags/FlagGB.vue'
import FlagGD from './flags/FlagGD.vue'
import FlagGEAB from './flags/FlagGEAB.vue'
import FlagGEOS from './flags/FlagGEOS.vue'
import FlagGE from './flags/FlagGE.vue'
import FlagGF from './flags/FlagGF.vue'
import FlagGG from './flags/FlagGG.vue'
import FlagGH from './flags/FlagGH.vue'
import FlagGI from './flags/FlagGI.vue'
import FlagGL from './flags/FlagGL.vue'
import FlagGM from './flags/FlagGM.vue'
import FlagGN from './flags/FlagGN.vue'
import FlagGP from './flags/FlagGP.vue'
import FlagGQ from './flags/FlagGQ.vue'
import FlagGR from './flags/FlagGR.vue'
import FlagGS from './flags/FlagGS.vue'
import FlagGT from './flags/FlagGT.vue'
import FlagGU from './flags/FlagGU.vue'
import FlagGW from './flags/FlagGW.vue'
import FlagGY from './flags/FlagGY.vue'
import FlagHK from './flags/FlagHK.vue'
import FlagHM from './flags/FlagHM.vue'
import FlagHN from './flags/FlagHN.vue'
import FlagHR from './flags/FlagHR.vue'
import FlagHT from './flags/FlagHT.vue'
import FlagHU from './flags/FlagHU.vue'
import FlagID from './flags/FlagID.vue'
import FlagIE from './flags/FlagIE.vue'
import FlagIL from './flags/FlagIL.vue'
import FlagIM from './flags/FlagIM.vue'
import FlagIN from './flags/FlagIN.vue'
import FlagIO from './flags/FlagIO.vue'
import FlagIQ from './flags/FlagIQ.vue'
import FlagIR from './flags/FlagIR.vue'
import FlagIS from './flags/FlagIS.vue'
import FlagIT from './flags/FlagIT.vue'
import FlagJE from './flags/FlagJE.vue'
import FlagJM from './flags/FlagJM.vue'
import FlagJO from './flags/FlagJO.vue'
import FlagJP from './flags/FlagJP.vue'
import FlagKE from './flags/FlagKE.vue'
import FlagKG from './flags/FlagKG.vue'
import FlagKH from './flags/FlagKH.vue'
import FlagKI from './flags/FlagKI.vue'
import FlagKM from './flags/FlagKM.vue'
import FlagKN from './flags/FlagKN.vue'
import FlagKP from './flags/FlagKP.vue'
import FlagKR from './flags/FlagKR.vue'
import FlagKW from './flags/FlagKW.vue'
import FlagKY from './flags/FlagKY.vue'
import FlagKZ from './flags/FlagKZ.vue'
import FlagLA from './flags/FlagLA.vue'
import FlagLB from './flags/FlagLB.vue'
import FlagLC from './flags/FlagLC.vue'
import FlagLI from './flags/FlagLI.vue'
import FlagLK from './flags/FlagLK.vue'
import FlagLR from './flags/FlagLR.vue'
import FlagLS from './flags/FlagLS.vue'
import FlagLT from './flags/FlagLT.vue'
import FlagLU from './flags/FlagLU.vue'
import FlagLV from './flags/FlagLV.vue'
import FlagLY from './flags/FlagLY.vue'
import FlagMA from './flags/FlagMA.vue'
import FlagMC from './flags/FlagMC.vue'
import FlagMD from './flags/FlagMD.vue'
import FlagME from './flags/FlagME.vue'
import FlagMF from './flags/FlagMF.vue'
import FlagMG from './flags/FlagMG.vue'
import FlagMH from './flags/FlagMH.vue'
import FlagMK from './flags/FlagMK.vue'
import FlagML from './flags/FlagML.vue'
import FlagMM from './flags/FlagMM.vue'
import FlagMN from './flags/FlagMN.vue'
import FlagMO from './flags/FlagMO.vue'
import FlagMP from './flags/FlagMP.vue'
import FlagMQ from './flags/FlagMQ.vue'
import FlagMR from './flags/FlagMR.vue'
import FlagMS from './flags/FlagMS.vue'
import FlagMT from './flags/FlagMT.vue'
import FlagMU from './flags/FlagMU.vue'
import FlagMV from './flags/FlagMV.vue'
import FlagMW from './flags/FlagMW.vue'
import FlagMX from './flags/FlagMX.vue'
import FlagMY from './flags/FlagMY.vue'
import FlagMZ from './flags/FlagMZ.vue'
import FlagNA from './flags/FlagNA.vue'
import FlagNC from './flags/FlagNC.vue'
import FlagNE from './flags/FlagNE.vue'
import FlagNF from './flags/FlagNF.vue'
import FlagNG from './flags/FlagNG.vue'
import FlagNI from './flags/FlagNI.vue'
import FlagNL from './flags/FlagNL.vue'
import FlagNO from './flags/FlagNO.vue'
import FlagNP from './flags/FlagNP.vue'
import FlagNR from './flags/FlagNR.vue'
import FlagNU from './flags/FlagNU.vue'
import FlagNZ from './flags/FlagNZ.vue'
import FlagOM from './flags/FlagOM.vue'
import FlagPA from './flags/FlagPA.vue'
import FlagPE from './flags/FlagPE.vue'
import FlagPF from './flags/FlagPF.vue'
import FlagPG from './flags/FlagPG.vue'
import FlagPH from './flags/FlagPH.vue'
import FlagPK from './flags/FlagPK.vue'
import FlagPL from './flags/FlagPL.vue'
import FlagPM from './flags/FlagPM.vue'
import FlagPN from './flags/FlagPN.vue'
import FlagPR from './flags/FlagPR.vue'
import FlagPS from './flags/FlagPS.vue'
import FlagPT from './flags/FlagPT.vue'
import FlagPW from './flags/FlagPW.vue'
import FlagPY from './flags/FlagPY.vue'
import FlagQA from './flags/FlagQA.vue'
import FlagRE from './flags/FlagRE.vue'
import FlagRO from './flags/FlagRO.vue'
import FlagRS from './flags/FlagRS.vue'
import FlagRU from './flags/FlagRU.vue'
import FlagRW from './flags/FlagRW.vue'
import FlagSA from './flags/FlagSA.vue'
import FlagSB from './flags/FlagSB.vue'
import FlagSC from './flags/FlagSC.vue'
import FlagSD from './flags/FlagSD.vue'
import FlagSE from './flags/FlagSE.vue'
import FlagSG from './flags/FlagSG.vue'
import FlagSH from './flags/FlagSH.vue'
import FlagSI from './flags/FlagSI.vue'
import FlagSJ from './flags/FlagSJ.vue'
import FlagSK from './flags/FlagSK.vue'
import FlagSL from './flags/FlagSL.vue'
import FlagSM from './flags/FlagSM.vue'
import FlagSN from './flags/FlagSN.vue'
import FlagSO from './flags/FlagSO.vue'
import FlagSR from './flags/FlagSR.vue'
import FlagSS from './flags/FlagSS.vue'
import FlagST from './flags/FlagST.vue'
import FlagSV from './flags/FlagSV.vue'
import FlagSX from './flags/FlagSX.vue'
import FlagSY from './flags/FlagSY.vue'
import FlagSZ from './flags/FlagSZ.vue'
import FlagTA from './flags/FlagTA.vue'
import FlagTC from './flags/FlagTC.vue'
import FlagTD from './flags/FlagTD.vue'
import FlagTF from './flags/FlagTF.vue'
import FlagTG from './flags/FlagTG.vue'
import FlagTH from './flags/FlagTH.vue'
import FlagTJ from './flags/FlagTJ.vue'
import FlagTK from './flags/FlagTK.vue'
import FlagTL from './flags/FlagTL.vue'
import FlagTM from './flags/FlagTM.vue'
import FlagTN from './flags/FlagTN.vue'
import FlagTO from './flags/FlagTO.vue'
import FlagTR from './flags/FlagTR.vue'
import FlagTT from './flags/FlagTT.vue'
import FlagTV from './flags/FlagTV.vue'
import FlagTW from './flags/FlagTW.vue'
import FlagTZ from './flags/FlagTZ.vue'
import FlagUA from './flags/FlagUA.vue'
import FlagUG from './flags/FlagUG.vue'
import FlagUM from './flags/FlagUM.vue'
import FlagUS from './flags/FlagUS.vue'
import FlagUY from './flags/FlagUY.vue'
import FlagUZ from './flags/FlagUZ.vue'
import FlagVA from './flags/FlagVA.vue'
import FlagVC from './flags/FlagVC.vue'
import FlagVE from './flags/FlagVE.vue'
import FlagVG from './flags/FlagVG.vue'
import FlagVI from './flags/FlagVI.vue'
import FlagVN from './flags/FlagVN.vue'
import FlagVU from './flags/FlagVU.vue'
import FlagWF from './flags/FlagWF.vue'
import FlagWS from './flags/FlagWS.vue'
import FlagXK from './flags/FlagXK.vue'
import FlagYE from './flags/FlagYE.vue'
import FlagYT from './flags/FlagYT.vue'
import FlagZA from './flags/FlagZA.vue'
import FlagZM from './flags/FlagZM.vue'
import FlagZW from './flags/FlagZW.vue'

export default defineComponent({
    components: {
        FlagAC,
        FlagAD,
        FlagAE,
        FlagAF,
        FlagAG,
        FlagAI,
        FlagAL,
        FlagAM,
        FlagAO,
        FlagAQ,
        FlagAR,
        FlagAS,
        FlagAT,
        FlagAU,
        FlagAW,
        FlagAX,
        FlagAZ,
        FlagBA,
        FlagBB,
        FlagBD,
        FlagBE,
        FlagBF,
        FlagBG,
        FlagBH,
        FlagBI,
        FlagBJ,
        FlagBL,
        FlagBM,
        FlagBN,
        FlagBO,
        FlagBQ,
        FlagBR,
        FlagBS,
        FlagBT,
        FlagBV,
        FlagBW,
        FlagBY,
        FlagBZ,
        FlagCA,
        FlagCC,
        FlagCD,
        FlagCF,
        FlagCG,
        FlagCH,
        FlagCI,
        FlagCK,
        FlagCL,
        FlagCM,
        FlagCN,
        FlagCO,
        FlagCR,
        FlagCU,
        FlagCV,
        FlagCW,
        FlagCX,
        FlagCY,
        FlagCZ,
        FlagDE,
        FlagDJ,
        FlagDK,
        FlagDM,
        FlagDO,
        FlagDZ,
        FlagEC,
        FlagEE,
        FlagEG,
        FlagEH,
        FlagER,
        FlagES,
        FlagET,
        FlagEU,
        FlagFI,
        FlagFJ,
        FlagFK,
        FlagFM,
        FlagFO,
        FlagFR,
        FlagGA,
        FlagGB,
        FlagGD,
        FlagGEAB,
        FlagGEOS,
        FlagGE,
        FlagGF,
        FlagGG,
        FlagGH,
        FlagGI,
        FlagGL,
        FlagGM,
        FlagGN,
        FlagGP,
        FlagGQ,
        FlagGR,
        FlagGS,
        FlagGT,
        FlagGU,
        FlagGW,
        FlagGY,
        FlagHK,
        FlagHM,
        FlagHN,
        FlagHR,
        FlagHT,
        FlagHU,
        FlagID,
        FlagIE,
        FlagIL,
        FlagIM,
        FlagIN,
        FlagIO,
        FlagIQ,
        FlagIR,
        FlagIS,
        FlagIT,
        FlagJE,
        FlagJM,
        FlagJO,
        FlagJP,
        FlagKE,
        FlagKG,
        FlagKH,
        FlagKI,
        FlagKM,
        FlagKN,
        FlagKP,
        FlagKR,
        FlagKW,
        FlagKY,
        FlagKZ,
        FlagLA,
        FlagLB,
        FlagLC,
        FlagLI,
        FlagLK,
        FlagLR,
        FlagLS,
        FlagLT,
        FlagLU,
        FlagLV,
        FlagLY,
        FlagMA,
        FlagMC,
        FlagMD,
        FlagME,
        FlagMF,
        FlagMG,
        FlagMH,
        FlagMK,
        FlagML,
        FlagMM,
        FlagMN,
        FlagMO,
        FlagMP,
        FlagMQ,
        FlagMR,
        FlagMS,
        FlagMT,
        FlagMU,
        FlagMV,
        FlagMW,
        FlagMX,
        FlagMY,
        FlagMZ,
        FlagNA,
        FlagNC,
        FlagNE,
        FlagNF,
        FlagNG,
        FlagNI,
        FlagNL,
        FlagNO,
        FlagNP,
        FlagNR,
        FlagNU,
        FlagNZ,
        FlagOM,
        FlagPA,
        FlagPE,
        FlagPF,
        FlagPG,
        FlagPH,
        FlagPK,
        FlagPL,
        FlagPM,
        FlagPN,
        FlagPR,
        FlagPS,
        FlagPT,
        FlagPW,
        FlagPY,
        FlagQA,
        FlagRE,
        FlagRO,
        FlagRS,
        FlagRU,
        FlagRW,
        FlagSA,
        FlagSB,
        FlagSC,
        FlagSD,
        FlagSE,
        FlagSG,
        FlagSH,
        FlagSI,
        FlagSJ,
        FlagSK,
        FlagSL,
        FlagSM,
        FlagSN,
        FlagSO,
        FlagSR,
        FlagSS,
        FlagST,
        FlagSV,
        FlagSX,
        FlagSY,
        FlagSZ,
        FlagTA,
        FlagTC,
        FlagTD,
        FlagTF,
        FlagTG,
        FlagTH,
        FlagTJ,
        FlagTK,
        FlagTL,
        FlagTM,
        FlagTN,
        FlagTO,
        FlagTR,
        FlagTT,
        FlagTV,
        FlagTW,
        FlagTZ,
        FlagUA,
        FlagUG,
        FlagUM,
        FlagUS,
        FlagUY,
        FlagUZ,
        FlagVA,
        FlagVC,
        FlagVE,
        FlagVG,
        FlagVI,
        FlagVN,
        FlagVU,
        FlagWF,
        FlagWS,
        FlagXK,
        FlagYE,
        FlagYT,
        FlagZA,
        FlagZM,
        FlagZW,
    },
    props: {
        country: {
            type: String,
            required: true,
        },
    },
    computed: {
        componentName() {
            return `Flag${this.country}`
        },
    },
})
</script>

<template>
  <component :is="componentName" />
</template>
