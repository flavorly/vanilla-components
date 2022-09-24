<script lang="ts">
import { defineComponent } from 'vue'

// Components
import FlagAC from './Flags/FlagAC.vue'
import FlagAD from './Flags/FlagAD.vue'
import FlagAE from './Flags/FlagAE.vue'
import FlagAF from './Flags/FlagAF.vue'
import FlagAG from './Flags/FlagAG.vue'
import FlagAI from './Flags/FlagAI.vue'
import FlagAL from './Flags/FlagAL.vue'
import FlagAM from './Flags/FlagAM.vue'
import FlagAO from './Flags/FlagAO.vue'
import FlagAQ from './Flags/FlagAQ.vue'
import FlagAR from './Flags/FlagAR.vue'
import FlagAS from './Flags/FlagAS.vue'
import FlagAT from './Flags/FlagAT.vue'
import FlagAU from './Flags/FlagAU.vue'
import FlagAW from './Flags/FlagAW.vue'
import FlagAX from './Flags/FlagAX.vue'
import FlagAZ from './Flags/FlagAZ.vue'
import FlagBA from './Flags/FlagBA.vue'
import FlagBB from './Flags/FlagBB.vue'
import FlagBD from './Flags/FlagBD.vue'
import FlagBE from './Flags/FlagBE.vue'
import FlagBF from './Flags/FlagBF.vue'
import FlagBG from './Flags/FlagBG.vue'
import FlagBH from './Flags/FlagBH.vue'
import FlagBI from './Flags/FlagBI.vue'
import FlagBJ from './Flags/FlagBJ.vue'
import FlagBL from './Flags/FlagBL.vue'
import FlagBM from './Flags/FlagBM.vue'
import FlagBN from './Flags/FlagBN.vue'
import FlagBO from './Flags/FlagBO.vue'
import FlagBQ from './Flags/FlagBQ.vue'
import FlagBR from './Flags/FlagBR.vue'
import FlagBS from './Flags/FlagBS.vue'
import FlagBT from './Flags/FlagBT.vue'
import FlagBV from './Flags/FlagBV.vue'
import FlagBW from './Flags/FlagBW.vue'
import FlagBY from './Flags/FlagBY.vue'
import FlagBZ from './Flags/FlagBZ.vue'
import FlagCA from './Flags/FlagCA.vue'
import FlagCC from './Flags/FlagCC.vue'
import FlagCD from './Flags/FlagCD.vue'
import FlagCF from './Flags/FlagCF.vue'
import FlagCG from './Flags/FlagCG.vue'
import FlagCH from './Flags/FlagCH.vue'
import FlagCI from './Flags/FlagCI.vue'
import FlagCK from './Flags/FlagCK.vue'
import FlagCL from './Flags/FlagCL.vue'
import FlagCM from './Flags/FlagCM.vue'
import FlagCN from './Flags/FlagCN.vue'
import FlagCO from './Flags/FlagCO.vue'
import FlagCR from './Flags/FlagCR.vue'
import FlagCU from './Flags/FlagCU.vue'
import FlagCV from './Flags/FlagCV.vue'
import FlagCW from './Flags/FlagCW.vue'
import FlagCX from './Flags/FlagCX.vue'
import FlagCY from './Flags/FlagCY.vue'
import FlagCZ from './Flags/FlagCZ.vue'
import FlagDE from './Flags/FlagDE.vue'
import FlagDJ from './Flags/FlagDJ.vue'
import FlagDK from './Flags/FlagDK.vue'
import FlagDM from './Flags/FlagDM.vue'
import FlagDO from './Flags/FlagDO.vue'
import FlagDZ from './Flags/FlagDZ.vue'
import FlagEC from './Flags/FlagEC.vue'
import FlagEE from './Flags/FlagEE.vue'
import FlagEG from './Flags/FlagEG.vue'
import FlagEH from './Flags/FlagEH.vue'
import FlagER from './Flags/FlagER.vue'
import FlagES from './Flags/FlagES.vue'
import FlagET from './Flags/FlagET.vue'
import FlagEU from './Flags/FlagEU.vue'
import FlagFI from './Flags/FlagFI.vue'
import FlagFJ from './Flags/FlagFJ.vue'
import FlagFK from './Flags/FlagFK.vue'
import FlagFM from './Flags/FlagFM.vue'
import FlagFO from './Flags/FlagFO.vue'
import FlagFR from './Flags/FlagFR.vue'
import FlagGA from './Flags/FlagGA.vue'
import FlagGB from './Flags/FlagGB.vue'
import FlagGD from './Flags/FlagGD.vue'
import FlagGEAB from './Flags/FlagGEAB.vue'
import FlagGEOS from './Flags/FlagGEOS.vue'
import FlagGE from './Flags/FlagGE.vue'
import FlagGF from './Flags/FlagGF.vue'
import FlagGG from './Flags/FlagGG.vue'
import FlagGH from './Flags/FlagGH.vue'
import FlagGI from './Flags/FlagGI.vue'
import FlagGL from './Flags/FlagGL.vue'
import FlagGM from './Flags/FlagGM.vue'
import FlagGN from './Flags/FlagGN.vue'
import FlagGP from './Flags/FlagGP.vue'
import FlagGQ from './Flags/FlagGQ.vue'
import FlagGR from './Flags/FlagGR.vue'
import FlagGS from './Flags/FlagGS.vue'
import FlagGT from './Flags/FlagGT.vue'
import FlagGU from './Flags/FlagGU.vue'
import FlagGW from './Flags/FlagGW.vue'
import FlagGY from './Flags/FlagGY.vue'
import FlagHK from './Flags/FlagHK.vue'
import FlagHM from './Flags/FlagHM.vue'
import FlagHN from './Flags/FlagHN.vue'
import FlagHR from './Flags/FlagHR.vue'
import FlagHT from './Flags/FlagHT.vue'
import FlagHU from './Flags/FlagHU.vue'
import FlagID from './Flags/FlagID.vue'
import FlagIE from './Flags/FlagIE.vue'
import FlagIL from './Flags/FlagIL.vue'
import FlagIM from './Flags/FlagIM.vue'
import FlagIN from './Flags/FlagIN.vue'
import FlagIO from './Flags/FlagIO.vue'
import FlagIQ from './Flags/FlagIQ.vue'
import FlagIR from './Flags/FlagIR.vue'
import FlagIS from './Flags/FlagIS.vue'
import FlagIT from './Flags/FlagIT.vue'
import FlagJE from './Flags/FlagJE.vue'
import FlagJM from './Flags/FlagJM.vue'
import FlagJO from './Flags/FlagJO.vue'
import FlagJP from './Flags/FlagJP.vue'
import FlagKE from './Flags/FlagKE.vue'
import FlagKG from './Flags/FlagKG.vue'
import FlagKH from './Flags/FlagKH.vue'
import FlagKI from './Flags/FlagKI.vue'
import FlagKM from './Flags/FlagKM.vue'
import FlagKN from './Flags/FlagKN.vue'
import FlagKP from './Flags/FlagKP.vue'
import FlagKR from './Flags/FlagKR.vue'
import FlagKW from './Flags/FlagKW.vue'
import FlagKY from './Flags/FlagKY.vue'
import FlagKZ from './Flags/FlagKZ.vue'
import FlagLA from './Flags/FlagLA.vue'
import FlagLB from './Flags/FlagLB.vue'
import FlagLC from './Flags/FlagLC.vue'
import FlagLI from './Flags/FlagLI.vue'
import FlagLK from './Flags/FlagLK.vue'
import FlagLR from './Flags/FlagLR.vue'
import FlagLS from './Flags/FlagLS.vue'
import FlagLT from './Flags/FlagLT.vue'
import FlagLU from './Flags/FlagLU.vue'
import FlagLV from './Flags/FlagLV.vue'
import FlagLY from './Flags/FlagLY.vue'
import FlagMA from './Flags/FlagMA.vue'
import FlagMC from './Flags/FlagMC.vue'
import FlagMD from './Flags/FlagMD.vue'
import FlagME from './Flags/FlagME.vue'
import FlagMF from './Flags/FlagMF.vue'
import FlagMG from './Flags/FlagMG.vue'
import FlagMH from './Flags/FlagMH.vue'
import FlagMK from './Flags/FlagMK.vue'
import FlagML from './Flags/FlagML.vue'
import FlagMM from './Flags/FlagMM.vue'
import FlagMN from './Flags/FlagMN.vue'
import FlagMO from './Flags/FlagMO.vue'
import FlagMP from './Flags/FlagMP.vue'
import FlagMQ from './Flags/FlagMQ.vue'
import FlagMR from './Flags/FlagMR.vue'
import FlagMS from './Flags/FlagMS.vue'
import FlagMT from './Flags/FlagMT.vue'
import FlagMU from './Flags/FlagMU.vue'
import FlagMV from './Flags/FlagMV.vue'
import FlagMW from './Flags/FlagMW.vue'
import FlagMX from './Flags/FlagMX.vue'
import FlagMY from './Flags/FlagMY.vue'
import FlagMZ from './Flags/FlagMZ.vue'
import FlagNA from './Flags/FlagNA.vue'
import FlagNC from './Flags/FlagNC.vue'
import FlagNE from './Flags/FlagNE.vue'
import FlagNF from './Flags/FlagNF.vue'
import FlagNG from './Flags/FlagNG.vue'
import FlagNI from './Flags/FlagNI.vue'
import FlagNL from './Flags/FlagNL.vue'
import FlagNO from './Flags/FlagNO.vue'
import FlagNP from './Flags/FlagNP.vue'
import FlagNR from './Flags/FlagNR.vue'
import FlagNU from './Flags/FlagNU.vue'
import FlagNZ from './Flags/FlagNZ.vue'
import FlagOM from './Flags/FlagOM.vue'
import FlagPA from './Flags/FlagPA.vue'
import FlagPE from './Flags/FlagPE.vue'
import FlagPF from './Flags/FlagPF.vue'
import FlagPG from './Flags/FlagPG.vue'
import FlagPH from './Flags/FlagPH.vue'
import FlagPK from './Flags/FlagPK.vue'
import FlagPL from './Flags/FlagPL.vue'
import FlagPM from './Flags/FlagPM.vue'
import FlagPN from './Flags/FlagPN.vue'
import FlagPR from './Flags/FlagPR.vue'
import FlagPS from './Flags/FlagPS.vue'
import FlagPT from './Flags/FlagPT.vue'
import FlagPW from './Flags/FlagPW.vue'
import FlagPY from './Flags/FlagPY.vue'
import FlagQA from './Flags/FlagQA.vue'
import FlagRE from './Flags/FlagRE.vue'
import FlagRO from './Flags/FlagRO.vue'
import FlagRS from './Flags/FlagRS.vue'
import FlagRU from './Flags/FlagRU.vue'
import FlagRW from './Flags/FlagRW.vue'
import FlagSA from './Flags/FlagSA.vue'
import FlagSB from './Flags/FlagSB.vue'
import FlagSC from './Flags/FlagSC.vue'
import FlagSD from './Flags/FlagSD.vue'
import FlagSE from './Flags/FlagSE.vue'
import FlagSG from './Flags/FlagSG.vue'
import FlagSH from './Flags/FlagSH.vue'
import FlagSI from './Flags/FlagSI.vue'
import FlagSJ from './Flags/FlagSJ.vue'
import FlagSK from './Flags/FlagSK.vue'
import FlagSL from './Flags/FlagSL.vue'
import FlagSM from './Flags/FlagSM.vue'
import FlagSN from './Flags/FlagSN.vue'
import FlagSO from './Flags/FlagSO.vue'
import FlagSR from './Flags/FlagSR.vue'
import FlagSS from './Flags/FlagSS.vue'
import FlagST from './Flags/FlagST.vue'
import FlagSV from './Flags/FlagSV.vue'
import FlagSX from './Flags/FlagSX.vue'
import FlagSY from './Flags/FlagSY.vue'
import FlagSZ from './Flags/FlagSZ.vue'
import FlagTA from './Flags/FlagTA.vue'
import FlagTC from './Flags/FlagTC.vue'
import FlagTD from './Flags/FlagTD.vue'
import FlagTF from './Flags/FlagTF.vue'
import FlagTG from './Flags/FlagTG.vue'
import FlagTH from './Flags/FlagTH.vue'
import FlagTJ from './Flags/FlagTJ.vue'
import FlagTK from './Flags/FlagTK.vue'
import FlagTL from './Flags/FlagTL.vue'
import FlagTM from './Flags/FlagTM.vue'
import FlagTN from './Flags/FlagTN.vue'
import FlagTO from './Flags/FlagTO.vue'
import FlagTR from './Flags/FlagTR.vue'
import FlagTT from './Flags/FlagTT.vue'
import FlagTV from './Flags/FlagTV.vue'
import FlagTW from './Flags/FlagTW.vue'
import FlagTZ from './Flags/FlagTZ.vue'
import FlagUA from './Flags/FlagUA.vue'
import FlagUG from './Flags/FlagUG.vue'
import FlagUM from './Flags/FlagUM.vue'
import FlagUS from './Flags/FlagUS.vue'
import FlagUY from './Flags/FlagUY.vue'
import FlagUZ from './Flags/FlagUZ.vue'
import FlagVA from './Flags/FlagVA.vue'
import FlagVC from './Flags/FlagVC.vue'
import FlagVE from './Flags/FlagVE.vue'
import FlagVG from './Flags/FlagVG.vue'
import FlagVI from './Flags/FlagVI.vue'
import FlagVN from './Flags/FlagVN.vue'
import FlagVU from './Flags/FlagVU.vue'
import FlagWF from './Flags/FlagWF.vue'
import FlagWS from './Flags/FlagWS.vue'
import FlagXK from './Flags/FlagXK.vue'
import FlagYE from './Flags/FlagYE.vue'
import FlagYT from './Flags/FlagYT.vue'
import FlagZA from './Flags/FlagZA.vue'
import FlagZM from './Flags/FlagZM.vue'
import FlagZW from './Flags/FlagZW.vue'

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
