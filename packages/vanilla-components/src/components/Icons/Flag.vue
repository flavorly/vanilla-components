<script lang="ts">
import { defineComponent } from 'vue'

// Components
import VanillaFlagAC from './Flags/FlagAC.vue'
import VanillaFlagAD from './Flags/FlagAD.vue'
import VanillaFlagAE from './Flags/FlagAE.vue'
import VanillaFlagAF from './Flags/FlagAF.vue'
import VanillaFlagAG from './Flags/FlagAG.vue'
import VanillaFlagAI from './Flags/FlagAI.vue'
import VanillaFlagAL from './Flags/FlagAL.vue'
import VanillaFlagAM from './Flags/FlagAM.vue'
import VanillaFlagAO from './Flags/FlagAO.vue'
import VanillaFlagAQ from './Flags/FlagAQ.vue'
import VanillaFlagAR from './Flags/FlagAR.vue'
import VanillaFlagAS from './Flags/FlagAS.vue'
import VanillaFlagAT from './Flags/FlagAT.vue'
import VanillaFlagAU from './Flags/FlagAU.vue'
import VanillaFlagAW from './Flags/FlagAW.vue'
import VanillaFlagAX from './Flags/FlagAX.vue'
import VanillaFlagAZ from './Flags/FlagAZ.vue'
import VanillaFlagBA from './Flags/FlagBA.vue'
import VanillaFlagBB from './Flags/FlagBB.vue'
import VanillaFlagBD from './Flags/FlagBD.vue'
import VanillaFlagBE from './Flags/FlagBE.vue'
import VanillaFlagBF from './Flags/FlagBF.vue'
import VanillaFlagBG from './Flags/FlagBG.vue'
import VanillaFlagBH from './Flags/FlagBH.vue'
import VanillaFlagBI from './Flags/FlagBI.vue'
import VanillaFlagBJ from './Flags/FlagBJ.vue'
import VanillaFlagBL from './Flags/FlagBL.vue'
import VanillaFlagBM from './Flags/FlagBM.vue'
import VanillaFlagBN from './Flags/FlagBN.vue'
import VanillaFlagBO from './Flags/FlagBO.vue'
import VanillaFlagBQ from './Flags/FlagBQ.vue'
import VanillaFlagBR from './Flags/FlagBR.vue'
import VanillaFlagBS from './Flags/FlagBS.vue'
import VanillaFlagBT from './Flags/FlagBT.vue'
import VanillaFlagBV from './Flags/FlagBV.vue'
import VanillaFlagBW from './Flags/FlagBW.vue'
import VanillaFlagBY from './Flags/FlagBY.vue'
import VanillaFlagBZ from './Flags/FlagBZ.vue'
import VanillaFlagCA from './Flags/FlagCA.vue'
import VanillaFlagCC from './Flags/FlagCC.vue'
import VanillaFlagCD from './Flags/FlagCD.vue'
import VanillaFlagCF from './Flags/FlagCF.vue'
import VanillaFlagCG from './Flags/FlagCG.vue'
import VanillaFlagCH from './Flags/FlagCH.vue'
import VanillaFlagCI from './Flags/FlagCI.vue'
import VanillaFlagCK from './Flags/FlagCK.vue'
import VanillaFlagCL from './Flags/FlagCL.vue'
import VanillaFlagCM from './Flags/FlagCM.vue'
import VanillaFlagCN from './Flags/FlagCN.vue'
import VanillaFlagCO from './Flags/FlagCO.vue'
import VanillaFlagCR from './Flags/FlagCR.vue'
import VanillaFlagCU from './Flags/FlagCU.vue'
import VanillaFlagCV from './Flags/FlagCV.vue'
import VanillaFlagCW from './Flags/FlagCW.vue'
import VanillaFlagCX from './Flags/FlagCX.vue'
import VanillaFlagCY from './Flags/FlagCY.vue'
import VanillaFlagCZ from './Flags/FlagCZ.vue'
import VanillaFlagDE from './Flags/FlagDE.vue'
import VanillaFlagDJ from './Flags/FlagDJ.vue'
import VanillaFlagDK from './Flags/FlagDK.vue'
import VanillaFlagDM from './Flags/FlagDM.vue'
import VanillaFlagDO from './Flags/FlagDO.vue'
import VanillaFlagDZ from './Flags/FlagDZ.vue'
import VanillaFlagEC from './Flags/FlagEC.vue'
import VanillaFlagEE from './Flags/FlagEE.vue'
import VanillaFlagEG from './Flags/FlagEG.vue'
import VanillaFlagEH from './Flags/FlagEH.vue'
import VanillaFlagER from './Flags/FlagER.vue'
import VanillaFlagES from './Flags/FlagES.vue'
import VanillaFlagET from './Flags/FlagET.vue'
import VanillaFlagEU from './Flags/FlagEU.vue'
import VanillaFlagFI from './Flags/FlagFI.vue'
import VanillaFlagFJ from './Flags/FlagFJ.vue'
import VanillaFlagFK from './Flags/FlagFK.vue'
import VanillaFlagFM from './Flags/FlagFM.vue'
import VanillaFlagFO from './Flags/FlagFO.vue'
import VanillaFlagFR from './Flags/FlagFR.vue'
import VanillaFlagGA from './Flags/FlagGA.vue'
import VanillaFlagGB from './Flags/FlagGB.vue'
import VanillaFlagGD from './Flags/FlagGD.vue'
import VanillaFlagGEAB from './Flags/FlagGEAB.vue'
import VanillaFlagGEOS from './Flags/FlagGEOS.vue'
import VanillaFlagGE from './Flags/FlagGE.vue'
import VanillaFlagGF from './Flags/FlagGF.vue'
import VanillaFlagGG from './Flags/FlagGG.vue'
import VanillaFlagGH from './Flags/FlagGH.vue'
import VanillaFlagGI from './Flags/FlagGI.vue'
import VanillaFlagGL from './Flags/FlagGL.vue'
import VanillaFlagGM from './Flags/FlagGM.vue'
import VanillaFlagGN from './Flags/FlagGN.vue'
import VanillaFlagGP from './Flags/FlagGP.vue'
import VanillaFlagGQ from './Flags/FlagGQ.vue'
import VanillaFlagGR from './Flags/FlagGR.vue'
import VanillaFlagGS from './Flags/FlagGS.vue'
import VanillaFlagGT from './Flags/FlagGT.vue'
import VanillaFlagGU from './Flags/FlagGU.vue'
import VanillaFlagGW from './Flags/FlagGW.vue'
import VanillaFlagGY from './Flags/FlagGY.vue'
import VanillaFlagHK from './Flags/FlagHK.vue'
import VanillaFlagHM from './Flags/FlagHM.vue'
import VanillaFlagHN from './Flags/FlagHN.vue'
import VanillaFlagHR from './Flags/FlagHR.vue'
import VanillaFlagHT from './Flags/FlagHT.vue'
import VanillaFlagHU from './Flags/FlagHU.vue'
import VanillaFlagID from './Flags/FlagID.vue'
import VanillaFlagIE from './Flags/FlagIE.vue'
import VanillaFlagIL from './Flags/FlagIL.vue'
import VanillaFlagIM from './Flags/FlagIM.vue'
import VanillaFlagIN from './Flags/FlagIN.vue'
import VanillaFlagIO from './Flags/FlagIO.vue'
import VanillaFlagIQ from './Flags/FlagIQ.vue'
import VanillaFlagIR from './Flags/FlagIR.vue'
import VanillaFlagIS from './Flags/FlagIS.vue'
import VanillaFlagIT from './Flags/FlagIT.vue'
import VanillaFlagJE from './Flags/FlagJE.vue'
import VanillaFlagJM from './Flags/FlagJM.vue'
import VanillaFlagJO from './Flags/FlagJO.vue'
import VanillaFlagJP from './Flags/FlagJP.vue'
import VanillaFlagKE from './Flags/FlagKE.vue'
import VanillaFlagKG from './Flags/FlagKG.vue'
import VanillaFlagKH from './Flags/FlagKH.vue'
import VanillaFlagKI from './Flags/FlagKI.vue'
import VanillaFlagKM from './Flags/FlagKM.vue'
import VanillaFlagKN from './Flags/FlagKN.vue'
import VanillaFlagKP from './Flags/FlagKP.vue'
import VanillaFlagKR from './Flags/FlagKR.vue'
import VanillaFlagKW from './Flags/FlagKW.vue'
import VanillaFlagKY from './Flags/FlagKY.vue'
import VanillaFlagKZ from './Flags/FlagKZ.vue'
import VanillaFlagLA from './Flags/FlagLA.vue'
import VanillaFlagLB from './Flags/FlagLB.vue'
import VanillaFlagLC from './Flags/FlagLC.vue'
import VanillaFlagLI from './Flags/FlagLI.vue'
import VanillaFlagLK from './Flags/FlagLK.vue'
import VanillaFlagLR from './Flags/FlagLR.vue'
import VanillaFlagLS from './Flags/FlagLS.vue'
import VanillaFlagLT from './Flags/FlagLT.vue'
import VanillaFlagLU from './Flags/FlagLU.vue'
import VanillaFlagLV from './Flags/FlagLV.vue'
import VanillaFlagLY from './Flags/FlagLY.vue'
import VanillaFlagMA from './Flags/FlagMA.vue'
import VanillaFlagMC from './Flags/FlagMC.vue'
import VanillaFlagMD from './Flags/FlagMD.vue'
import VanillaFlagME from './Flags/FlagME.vue'
import VanillaFlagMF from './Flags/FlagMF.vue'
import VanillaFlagMG from './Flags/FlagMG.vue'
import VanillaFlagMH from './Flags/FlagMH.vue'
import VanillaFlagMK from './Flags/FlagMK.vue'
import VanillaFlagML from './Flags/FlagML.vue'
import VanillaFlagMM from './Flags/FlagMM.vue'
import VanillaFlagMN from './Flags/FlagMN.vue'
import VanillaFlagMO from './Flags/FlagMO.vue'
import VanillaFlagMP from './Flags/FlagMP.vue'
import VanillaFlagMQ from './Flags/FlagMQ.vue'
import VanillaFlagMR from './Flags/FlagMR.vue'
import VanillaFlagMS from './Flags/FlagMS.vue'
import VanillaFlagMT from './Flags/FlagMT.vue'
import VanillaFlagMU from './Flags/FlagMU.vue'
import VanillaFlagMV from './Flags/FlagMV.vue'
import VanillaFlagMW from './Flags/FlagMW.vue'
import VanillaFlagMX from './Flags/FlagMX.vue'
import VanillaFlagMY from './Flags/FlagMY.vue'
import VanillaFlagMZ from './Flags/FlagMZ.vue'
import VanillaFlagNA from './Flags/FlagNA.vue'
import VanillaFlagNC from './Flags/FlagNC.vue'
import VanillaFlagNE from './Flags/FlagNE.vue'
import VanillaFlagNF from './Flags/FlagNF.vue'
import VanillaFlagNG from './Flags/FlagNG.vue'
import VanillaFlagNI from './Flags/FlagNI.vue'
import VanillaFlagNL from './Flags/FlagNL.vue'
import VanillaFlagNO from './Flags/FlagNO.vue'
import VanillaFlagNP from './Flags/FlagNP.vue'
import VanillaFlagNR from './Flags/FlagNR.vue'
import VanillaFlagNU from './Flags/FlagNU.vue'
import VanillaFlagNZ from './Flags/FlagNZ.vue'
import VanillaFlagOM from './Flags/FlagOM.vue'
import VanillaFlagPA from './Flags/FlagPA.vue'
import VanillaFlagPE from './Flags/FlagPE.vue'
import VanillaFlagPF from './Flags/FlagPF.vue'
import VanillaFlagPG from './Flags/FlagPG.vue'
import VanillaFlagPH from './Flags/FlagPH.vue'
import VanillaFlagPK from './Flags/FlagPK.vue'
import VanillaFlagPL from './Flags/FlagPL.vue'
import VanillaFlagPM from './Flags/FlagPM.vue'
import VanillaFlagPN from './Flags/FlagPN.vue'
import VanillaFlagPR from './Flags/FlagPR.vue'
import VanillaFlagPS from './Flags/FlagPS.vue'
import VanillaFlagPT from './Flags/FlagPT.vue'
import VanillaFlagPW from './Flags/FlagPW.vue'
import VanillaFlagPY from './Flags/FlagPY.vue'
import VanillaFlagQA from './Flags/FlagQA.vue'
import VanillaFlagRE from './Flags/FlagRE.vue'
import VanillaFlagRO from './Flags/FlagRO.vue'
import VanillaFlagRS from './Flags/FlagRS.vue'
import VanillaFlagRU from './Flags/FlagRU.vue'
import VanillaFlagRW from './Flags/FlagRW.vue'
import VanillaFlagSA from './Flags/FlagSA.vue'
import VanillaFlagSB from './Flags/FlagSB.vue'
import VanillaFlagSC from './Flags/FlagSC.vue'
import VanillaFlagSD from './Flags/FlagSD.vue'
import VanillaFlagSE from './Flags/FlagSE.vue'
import VanillaFlagSG from './Flags/FlagSG.vue'
import VanillaFlagSH from './Flags/FlagSH.vue'
import VanillaFlagSI from './Flags/FlagSI.vue'
import VanillaFlagSJ from './Flags/FlagSJ.vue'
import VanillaFlagSK from './Flags/FlagSK.vue'
import VanillaFlagSL from './Flags/FlagSL.vue'
import VanillaFlagSM from './Flags/FlagSM.vue'
import VanillaFlagSN from './Flags/FlagSN.vue'
import VanillaFlagSO from './Flags/FlagSO.vue'
import VanillaFlagSR from './Flags/FlagSR.vue'
import VanillaFlagSS from './Flags/FlagSS.vue'
import VanillaFlagST from './Flags/FlagST.vue'
import VanillaFlagSV from './Flags/FlagSV.vue'
import VanillaFlagSX from './Flags/FlagSX.vue'
import VanillaFlagSY from './Flags/FlagSY.vue'
import VanillaFlagSZ from './Flags/FlagSZ.vue'
import VanillaFlagTA from './Flags/FlagTA.vue'
import VanillaFlagTC from './Flags/FlagTC.vue'
import VanillaFlagTD from './Flags/FlagTD.vue'
import VanillaFlagTF from './Flags/FlagTF.vue'
import VanillaFlagTG from './Flags/FlagTG.vue'
import VanillaFlagTH from './Flags/FlagTH.vue'
import VanillaFlagTJ from './Flags/FlagTJ.vue'
import VanillaFlagTK from './Flags/FlagTK.vue'
import VanillaFlagTL from './Flags/FlagTL.vue'
import VanillaFlagTM from './Flags/FlagTM.vue'
import VanillaFlagTN from './Flags/FlagTN.vue'
import VanillaFlagTO from './Flags/FlagTO.vue'
import VanillaFlagTR from './Flags/FlagTR.vue'
import VanillaFlagTT from './Flags/FlagTT.vue'
import VanillaFlagTV from './Flags/FlagTV.vue'
import VanillaFlagTW from './Flags/FlagTW.vue'
import VanillaFlagTZ from './Flags/FlagTZ.vue'
import VanillaFlagUA from './Flags/FlagUA.vue'
import VanillaFlagUG from './Flags/FlagUG.vue'
import VanillaFlagUM from './Flags/FlagUM.vue'
import VanillaFlagUS from './Flags/FlagUS.vue'
import VanillaFlagUY from './Flags/FlagUY.vue'
import VanillaFlagUZ from './Flags/FlagUZ.vue'
import VanillaFlagVA from './Flags/FlagVA.vue'
import VanillaFlagVC from './Flags/FlagVC.vue'
import VanillaFlagVE from './Flags/FlagVE.vue'
import VanillaFlagVG from './Flags/FlagVG.vue'
import VanillaFlagVI from './Flags/FlagVI.vue'
import VanillaFlagVN from './Flags/FlagVN.vue'
import VanillaFlagVU from './Flags/FlagVU.vue'
import VanillaFlagWF from './Flags/FlagWF.vue'
import VanillaFlagWS from './Flags/FlagWS.vue'
import VanillaFlagXK from './Flags/FlagXK.vue'
import VanillaFlagYE from './Flags/FlagYE.vue'
import VanillaFlagYT from './Flags/FlagYT.vue'
import VanillaFlagZA from './Flags/FlagZA.vue'
import VanillaFlagZM from './Flags/FlagZM.vue'
import VanillaFlagZW from './Flags/FlagZW.vue'

export default defineComponent({
    name: 'VanillaFlag',
    components: {
        VanillaFlagAC,
        VanillaFlagAD,
        VanillaFlagAE,
        VanillaFlagAF,
        VanillaFlagAG,
        VanillaFlagAI,
        VanillaFlagAL,
        VanillaFlagAM,
        VanillaFlagAO,
        VanillaFlagAQ,
        VanillaFlagAR,
        VanillaFlagAS,
        VanillaFlagAT,
        VanillaFlagAU,
        VanillaFlagAW,
        VanillaFlagAX,
        VanillaFlagAZ,
        VanillaFlagBA,
        VanillaFlagBB,
        VanillaFlagBD,
        VanillaFlagBE,
        VanillaFlagBF,
        VanillaFlagBG,
        VanillaFlagBH,
        VanillaFlagBI,
        VanillaFlagBJ,
        VanillaFlagBL,
        VanillaFlagBM,
        VanillaFlagBN,
        VanillaFlagBO,
        VanillaFlagBQ,
        VanillaFlagBR,
        VanillaFlagBS,
        VanillaFlagBT,
        VanillaFlagBV,
        VanillaFlagBW,
        VanillaFlagBY,
        VanillaFlagBZ,
        VanillaFlagCA,
        VanillaFlagCC,
        VanillaFlagCD,
        VanillaFlagCF,
        VanillaFlagCG,
        VanillaFlagCH,
        VanillaFlagCI,
        VanillaFlagCK,
        VanillaFlagCL,
        VanillaFlagCM,
        VanillaFlagCN,
        VanillaFlagCO,
        VanillaFlagCR,
        VanillaFlagCU,
        VanillaFlagCV,
        VanillaFlagCW,
        VanillaFlagCX,
        VanillaFlagCY,
        VanillaFlagCZ,
        VanillaFlagDE,
        VanillaFlagDJ,
        VanillaFlagDK,
        VanillaFlagDM,
        VanillaFlagDO,
        VanillaFlagDZ,
        VanillaFlagEC,
        VanillaFlagEE,
        VanillaFlagEG,
        VanillaFlagEH,
        VanillaFlagER,
        VanillaFlagES,
        VanillaFlagET,
        VanillaFlagEU,
        VanillaFlagFI,
        VanillaFlagFJ,
        VanillaFlagFK,
        VanillaFlagFM,
        VanillaFlagFO,
        VanillaFlagFR,
        VanillaFlagGA,
        VanillaFlagGB,
        VanillaFlagGD,
        VanillaFlagGEAB,
        VanillaFlagGEOS,
        VanillaFlagGE,
        VanillaFlagGF,
        VanillaFlagGG,
        VanillaFlagGH,
        VanillaFlagGI,
        VanillaFlagGL,
        VanillaFlagGM,
        VanillaFlagGN,
        VanillaFlagGP,
        VanillaFlagGQ,
        VanillaFlagGR,
        VanillaFlagGS,
        VanillaFlagGT,
        VanillaFlagGU,
        VanillaFlagGW,
        VanillaFlagGY,
        VanillaFlagHK,
        VanillaFlagHM,
        VanillaFlagHN,
        VanillaFlagHR,
        VanillaFlagHT,
        VanillaFlagHU,
        VanillaFlagID,
        VanillaFlagIE,
        VanillaFlagIL,
        VanillaFlagIM,
        VanillaFlagIN,
        VanillaFlagIO,
        VanillaFlagIQ,
        VanillaFlagIR,
        VanillaFlagIS,
        VanillaFlagIT,
        VanillaFlagJE,
        VanillaFlagJM,
        VanillaFlagJO,
        VanillaFlagJP,
        VanillaFlagKE,
        VanillaFlagKG,
        VanillaFlagKH,
        VanillaFlagKI,
        VanillaFlagKM,
        VanillaFlagKN,
        VanillaFlagKP,
        VanillaFlagKR,
        VanillaFlagKW,
        VanillaFlagKY,
        VanillaFlagKZ,
        VanillaFlagLA,
        VanillaFlagLB,
        VanillaFlagLC,
        VanillaFlagLI,
        VanillaFlagLK,
        VanillaFlagLR,
        VanillaFlagLS,
        VanillaFlagLT,
        VanillaFlagLU,
        VanillaFlagLV,
        VanillaFlagLY,
        VanillaFlagMA,
        VanillaFlagMC,
        VanillaFlagMD,
        VanillaFlagME,
        VanillaFlagMF,
        VanillaFlagMG,
        VanillaFlagMH,
        VanillaFlagMK,
        VanillaFlagML,
        VanillaFlagMM,
        VanillaFlagMN,
        VanillaFlagMO,
        VanillaFlagMP,
        VanillaFlagMQ,
        VanillaFlagMR,
        VanillaFlagMS,
        VanillaFlagMT,
        VanillaFlagMU,
        VanillaFlagMV,
        VanillaFlagMW,
        VanillaFlagMX,
        VanillaFlagMY,
        VanillaFlagMZ,
        VanillaFlagNA,
        VanillaFlagNC,
        VanillaFlagNE,
        VanillaFlagNF,
        VanillaFlagNG,
        VanillaFlagNI,
        VanillaFlagNL,
        VanillaFlagNO,
        VanillaFlagNP,
        VanillaFlagNR,
        VanillaFlagNU,
        VanillaFlagNZ,
        VanillaFlagOM,
        VanillaFlagPA,
        VanillaFlagPE,
        VanillaFlagPF,
        VanillaFlagPG,
        VanillaFlagPH,
        VanillaFlagPK,
        VanillaFlagPL,
        VanillaFlagPM,
        VanillaFlagPN,
        VanillaFlagPR,
        VanillaFlagPS,
        VanillaFlagPT,
        VanillaFlagPW,
        VanillaFlagPY,
        VanillaFlagQA,
        VanillaFlagRE,
        VanillaFlagRO,
        VanillaFlagRS,
        VanillaFlagRU,
        VanillaFlagRW,
        VanillaFlagSA,
        VanillaFlagSB,
        VanillaFlagSC,
        VanillaFlagSD,
        VanillaFlagSE,
        VanillaFlagSG,
        VanillaFlagSH,
        VanillaFlagSI,
        VanillaFlagSJ,
        VanillaFlagSK,
        VanillaFlagSL,
        VanillaFlagSM,
        VanillaFlagSN,
        VanillaFlagSO,
        VanillaFlagSR,
        VanillaFlagSS,
        VanillaFlagST,
        VanillaFlagSV,
        VanillaFlagSX,
        VanillaFlagSY,
        VanillaFlagSZ,
        VanillaFlagTA,
        VanillaFlagTC,
        VanillaFlagTD,
        VanillaFlagTF,
        VanillaFlagTG,
        VanillaFlagTH,
        VanillaFlagTJ,
        VanillaFlagTK,
        VanillaFlagTL,
        VanillaFlagTM,
        VanillaFlagTN,
        VanillaFlagTO,
        VanillaFlagTR,
        VanillaFlagTT,
        VanillaFlagTV,
        VanillaFlagTW,
        VanillaFlagTZ,
        VanillaFlagUA,
        VanillaFlagUG,
        VanillaFlagUM,
        VanillaFlagUS,
        VanillaFlagUY,
        VanillaFlagUZ,
        VanillaFlagVA,
        VanillaFlagVC,
        VanillaFlagVE,
        VanillaFlagVG,
        VanillaFlagVI,
        VanillaFlagVN,
        VanillaFlagVU,
        VanillaFlagWF,
        VanillaFlagWS,
        VanillaFlagXK,
        VanillaFlagYE,
        VanillaFlagYT,
        VanillaFlagZA,
        VanillaFlagZM,
        VanillaFlagZW,
    },
    props: {
        country: {
            type: String,
            required: true,
        },
    },
    computed: {
        componentName() {
            return `VanillaFlag${this.country}`
        },
    },
})
</script>

<template>
  <component :is="componentName" />
</template>
