/*
    node filepath
    this script's file path
    arg1
    arg2
    ...
*/

if (process.argv.length != 3) {
    console.log("Please give ONLY the folder path!")
    console.log("Given:");
    for (i = 0; i < process.argv.length; i++) { console.log(process.argv[i]); }
    process.exit(0);
}

const path = require("path");

/*  Path seeminly defaults to the system? (tested on windows)
    WIN+WIN=WIN
> path.join("C:\\users", "hayden", "\\desktop")
'C:\\users\\hayden\\desktop'
    LIN+LIN=WIN
> path.join("/home", "hayden", "/desktop")
'\\home\\hayden\\desktop'
    WIN+LIN=WIN
> path.join("C:\\users", "hayden", "/desktop")
'C:\\users\\hayden\\desktop'
    LIN+WIN=WIN
> path.join("/users", "hayden", "\\desktop")
'\\users\\hayden\\desktop'
*/

const fs = require("fs");
const crc32 = require("crc-32");
const https = require("https");

const folderpath = process.argv[2];


if (!fs.existsSync(folderpath)) {
    console.log("Folder does not exist!\nFolder given: " + folderpath);
    process.exit(0);
}

console.log("Folder exists");

var fileList = {
    "data/customparks/custom22.prk": {
        "crc32": "07a3a8f6",
        "link": "/update/beta/0.6.0.0/data/customparks/custom22.prk",
        "version": "0.6.0.0"
    },
    "data/customparks/custom23.prk": {
        "crc32": "4ec61f70",
        "link": "/update/beta/0.6.0.0/data/customparks/custom23.prk",
        "version": "0.6.0.0"
    },
    "data/customparks/custom24.prk": {
        "crc32": "6f70f3c6",
        "link": "/update/beta/0.6.0.0/data/customparks/custom24.prk",
        "version": "0.6.0.0"
    },
    "data/customparks/custom25.prk": {
        "crc32": "06f47648",
        "link": "/update/beta/0.6.0.0/data/customparks/custom25.prk",
        "version": "0.6.0.0"
    },
    "data/customparks/custom26.prk": {
        "crc32": "10e4caaf",
        "link": "/update/beta/0.6.0.0/data/customparks/custom26.prk",
        "version": "0.6.0.0"
    },
    "data/customparks/custom27.prk": {
        "crc32": "cae32cf8",
        "link": "/update/beta/0.6.0.0/data/customparks/custom27.prk",
        "version": "0.6.0.0"
    },
    "data/customparks/custom28.prk": {
        "crc32": "6f3a3908",
        "link": "/update/beta/0.6.0.0/data/customparks/custom28.prk",
        "version": "0.6.0.0"
    },
    "data/customparks/custom29.prk": {
        "crc32": "baaad579",
        "link": "/update/beta/0.6.0.0/data/customparks/custom29.prk",
        "version": "0.6.0.0"
    },
    "data/customparks/custom30.prk": {
        "crc32": "82b233d0",
        "link": "/update/beta/0.6.0.0/data/customparks/custom30.prk",
        "version": "0.6.0.0"
    },
    "data/customparks/custom31.prk": {
        "crc32": "d2771b68",
        "link": "/update/beta/0.6.0.0/data/customparks/custom31.prk",
        "version": "0.6.0.0"
    },
    "data/images/particles/SUB_AS_hh_bat_01_32.img.xbx": {
        "crc32": "bdfcae6b",
        "link": "/update/beta/0.6.0.4/data/images/particles/SUB_AS_hh_bat_01_32.img.xbx",
        "version": "0.6.0.4"
    },
    "data/images/thugpro/stickers/sticker_bh_afrodog.img.xbx": {
        "crc32": "be06b1ea",
        "link": "/update/beta/0.6.0.4/data/images/thugpro/stickers/sticker_bh_afrodog.img.xbx",
        "version": "0.6.0.4"
    },
    "data/images/thugpro/stickers/sticker_bh_chainsaw.img.xbx": {
        "crc32": "526a1794",
        "link": "/update/beta/0.6.0.4/data/images/thugpro/stickers/sticker_bh_chainsaw.img.xbx",
        "version": "0.6.0.4"
    },
    "data/images/thugpro/stickers/sticker_bh_hawk_blue.img.xbx": {
        "crc32": "fba28d05",
        "link": "/update/beta/0.6.0.4/data/images/thugpro/stickers/sticker_bh_hawk_blue.img.xbx",
        "version": "0.6.0.4"
    },
    "data/images/thugpro/stickers/sticker_bh_hawk_dice.img.xbx": {
        "crc32": "53765fc9",
        "link": "/update/beta/0.6.0.4/data/images/thugpro/stickers/sticker_bh_hawk_dice.img.xbx",
        "version": "0.6.0.4"
    },
    "data/images/thugpro/stickers/sticker_bh_hawk_skeleton.img.xbx": {
        "crc32": "d15a45e5",
        "link": "/update/beta/0.6.0.4/data/images/thugpro/stickers/sticker_bh_hawk_skeleton.img.xbx",
        "version": "0.6.0.4"
    },
    "data/images/thugpro/stickers/sticker_bh_killingbirds.img.xbx": {
        "crc32": "dcac2798",
        "link": "/update/beta/0.6.0.4/data/images/thugpro/stickers/sticker_bh_killingbirds.img.xbx",
        "version": "0.6.0.4"
    },
    "data/images/thugpro/stickers/sticker_bh_tattoo.img.xbx": {
        "crc32": "52ae6600",
        "link": "/update/beta/0.6.0.4/data/images/thugpro/stickers/sticker_bh_tattoo.img.xbx",
        "version": "0.6.0.4"
    },
    "data/images/thugpro/stickers/sticker_powell_birdclaw.img.xbx": {
        "crc32": "1abb4568",
        "link": "/update/beta/0.6.0.4/data/images/thugpro/stickers/sticker_powell_birdclaw.img.xbx",
        "version": "0.6.0.4"
    },
    "data/images/thugpro/stickers/sticker_powell_hawk.img.xbx": {
        "crc32": "b76f46ee",
        "link": "/update/beta/0.6.0.4/data/images/thugpro/stickers/sticker_powell_hawk.img.xbx",
        "version": "0.6.0.4"
    },
    "data/images/thugpro/stickers/sticker_powell_misfits.img.xbx": {
        "crc32": "8d7915e5",
        "link": "/update/beta/0.6.0.4/data/images/thugpro/stickers/sticker_powell_misfits.img.xbx",
        "version": "0.6.0.4"
    },
    "data/images/thugpro/stickers/sticker_thugpro.img.xbx": {
        "crc32": "0d4a86a6",
        "link": "/update/beta/0.6.0.4/data/images/thugpro/stickers/sticker_thugpro.img.xbx",
        "version": "0.6.0.4"
    },
    "data/images/thugpro/tags/tag_thugpro.img.xbx": {
        "crc32": "3a23c308",
        "link": "/update/beta/0.6.0.4/data/images/thugpro/tags/tag_thugpro.img.xbx",
        "version": "0.6.0.4"
    },
    "data/models/boards/Board_banana.cas.xbx": {
        "crc32": "2707d814",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_banana.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_banana.col.xbx": {
        "crc32": "a64195c5",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_banana.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_banana.skin.xbx": {
        "crc32": "da29f3b5",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_banana.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_banana.tex.xbx": {
        "crc32": "1fe0dbff",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_banana.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_Creature.cas.xbx": {
        "crc32": "2707d814",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_Creature.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_Creature.skin.xbx": {
        "crc32": "e3a0501c",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_Creature.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_Creature.tex.xbx": {
        "crc32": "b2eede19",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_Creature.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_Default.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_Default.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_Default.col.xbx": {
        "crc32": "a64195c5",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_Default.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_Default.skin.xbx": {
        "crc32": "d4f65a69",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_Default.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_Default.tex.xbx": {
        "crc32": "fbf32dfe",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_Default.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_Gene.cas.xbx": {
        "crc32": "2707d814",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_Gene.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_Gene.skin.xbx": {
        "crc32": "392feadc",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_Gene.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_Gene.tex.xbx": {
        "crc32": "d6c63fa8",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_Gene.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_gold.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_gold.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_gold.col.xbx": {
        "crc32": "a64195c5",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_gold.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_gold.skin.xbx": {
        "crc32": "c9ef2385",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_gold.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_gold.tex.xbx": {
        "crc32": "e1612cc1",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_gold.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_hover.cas.xbx": {
        "crc32": "2707d814",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_hover.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_hover.col.xbx": {
        "crc32": "a64195c5",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_hover.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_hover.skin.xbx": {
        "crc32": "efc97d35",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_hover.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_hover.tex.xbx": {
        "crc32": "4cf77ba2",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_hover.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_hoverboard02.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_hoverboard02.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_hoverboard02.col.xbx": {
        "crc32": "860fd7db",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_hoverboard02.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_hoverboard02.skin.xbx": {
        "crc32": "9248672f",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_hoverboard02.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_hoverboard02.tex.xbx": {
        "crc32": "6f7692f7",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_hoverboard02.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_Ironman.cas.xbx": {
        "crc32": "2707d814",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_Ironman.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_Ironman.skin.xbx": {
        "crc32": "db6e82e5",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_Ironman.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_Ironman.tex.xbx": {
        "crc32": "2215125e",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_Ironman.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_jango.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_jango.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_jango.col.xbx": {
        "crc32": "2da237c2",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_jango.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_jango.skin.xbx": {
        "crc32": "58b09512",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_jango.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_jango.tex.xbx": {
        "crc32": "9c26b18e",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_jango.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_JoleHD.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_JoleHD.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_JoleHD.skin.xbx": {
        "crc32": "736e1ac5",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_JoleHD.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_JoleHD.tex.xbx": {
        "crc32": "999a880c",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_JoleHD.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_long.cas.xbx": {
        "crc32": "2707d814",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_long.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_long.col.xbx": {
        "crc32": "a64195c5",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_long.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_long.skin.xbx": {
        "crc32": "345e7708",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_long.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_long.tex.xbx": {
        "crc32": "4b23a744",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_long.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_oldschool.cas.xbx": {
        "crc32": "2707d814",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_oldschool.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_oldschool.col.xbx": {
        "crc32": "a64195c5",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_oldschool.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_oldschool.skin.xbx": {
        "crc32": "16d95900",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_oldschool.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_oldschool.tex.xbx": {
        "crc32": "c9b5c868",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_oldschool.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_ollie.cas.xbx": {
        "crc32": "2707d814",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_ollie.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/Board_ollie.col.xbx": {
        "crc32": "a64195c5",
        "link": "/update/beta/0.6.0.0/data/models/boards/Board_ollie.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_Ollie.skin.xbx": {
        "crc32": "df3d9eed",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_Ollie.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_Ollie.tex.xbx": {
        "crc32": "c275954c",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_Ollie.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_slater.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.15/data/models/boards/board_slater.cas.xbx",
        "version": "0.6.0.15"
    },
    "data/models/boards/Board_slater.col.xbx": {
        "crc32": "a64195c5",
        "link": "/update/beta/0.6.0.15/data/models/boards/Board_slater.col.xbx",
        "version": "0.6.0.15"
    },
    "data/models/boards/board_slater.skin.xbx": {
        "crc32": "562f4ab2",
        "link": "/update/beta/0.6.0.15/data/models/boards/board_slater.skin.xbx",
        "version": "0.6.0.15"
    },
    "data/models/boards/board_slater.tex.xbx": {
        "crc32": "ad4ad540",
        "link": "/update/beta/0.6.0.15/data/models/boards/board_slater.tex.xbx",
        "version": "0.6.0.15"
    },
    "data/models/boards/board_surf.cas.xbx": {
        "crc32": "2707d814",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_surf.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_surf.skin.xbx": {
        "crc32": "46c2c5ac",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_surf.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_surf.tex.xbx": {
        "crc32": "548b1215",
        "link": "/update/beta/0.6.0.0/data/models/boards/board_surf.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/boards/board_xray.cas.xbx": {
        "crc32": "2707d814",
        "link": "/update/beta/0.6.0.15/data/models/boards/board_xray.cas.xbx",
        "version": "0.6.0.15"
    },
    "data/models/boards/board_xray.col.xbx": {
        "crc32": "a64195c5",
        "link": "/update/beta/0.6.0.15/data/models/boards/board_xray.col.xbx",
        "version": "0.6.0.15"
    },
    "data/models/boards/board_xray.skin.xbx": {
        "crc32": "1d22bfa9",
        "link": "/update/beta/0.6.0.15/data/models/boards/board_xray.skin.xbx",
        "version": "0.6.0.15"
    },
    "data/models/boards/board_xray.tex.xbx": {
        "crc32": "5488f887",
        "link": "/update/beta/0.6.0.15/data/models/boards/board_xray.tex.xbx",
        "version": "0.6.0.15"
    },
    "data/models/CAS_ITEMS/beard_xmas.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/beard_xmas.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/beard_xmas.col.xbx": {
        "crc32": "eb86ac90",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/beard_xmas.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/beard_xmas.skin.xbx": {
        "crc32": "917ff00e",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/beard_xmas.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/beard_xmas.tex.xbx": {
        "crc32": "e327082e",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/beard_xmas.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/hair_zss.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/hair_zss.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/hair_zss.col.xbx": {
        "crc32": "a01f1e24",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/hair_zss.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/hair_zss.skin.xbx": {
        "crc32": "e46f0e34",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/hair_zss.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/hair_zss.tex.xbx": {
        "crc32": "2e8cc16a",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/hair_zss.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/hat_xmas.cas.xbx": {
        "crc32": "d5cb5f8d",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/hat_xmas.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/hat_xmas.col.xbx": {
        "crc32": "eb86ac90",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/hat_xmas.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/hat_xmas.skin.xbx": {
        "crc32": "7c132218",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/hat_xmas.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/hat_xmas.tex.xbx": {
        "crc32": "57b83512",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/hat_xmas.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/Head_Octodad.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/Head_Octodad.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/Head_Octodad.col.xbx": {
        "crc32": "e1f49a19",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/Head_Octodad.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/Head_Octodad.skin.xbx": {
        "crc32": "7cbdc63d",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/Head_Octodad.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/Head_Octodad.tex.xbx": {
        "crc32": "d5b1d663",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/Head_Octodad.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/head_pumpkin.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/head_pumpkin.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/head_pumpkin.col.xbx": {
        "crc32": "eb86ac90",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/head_pumpkin.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/head_pumpkin.skin.xbx": {
        "crc32": "99603435",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/head_pumpkin.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/CAS_ITEMS/head_pumpkin.tex.xbx": {
        "crc32": "9e89c1b0",
        "link": "/update/beta/0.6.0.0/data/models/CAS_ITEMS/head_pumpkin.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/cutscenes/Cut_Bodyguard_FULL.skin.xbx": {
        "crc32": "1be4d463",
        "link": "/update/beta/0.6.0.0/data/models/cutscenes/Cut_Bodyguard_FULL.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/cutscenes/Cut_Bodyguard_FULL.tex.xbx": {
        "crc32": "1fde631d",
        "link": "/update/beta/0.6.0.0/data/models/cutscenes/Cut_Bodyguard_FULL.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Eric_Thug/ped_eric_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Eric_Thug/ped_eric_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Eric_Thug/ped_eric_thug.col.xbx": {
        "crc32": "dfeb551d",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Eric_Thug/ped_eric_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Eric_Thug/ped_eric_thug.skin.xbx": {
        "crc32": "3e8be12d",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Eric_Thug/ped_eric_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Eric_Thug/ped_eric_thug.tex.xbx": {
        "crc32": "44af8c11",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Eric_Thug/ped_eric_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Judge/Ped_judge.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Judge/Ped_judge.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Judge/Ped_judge.col.xbx": {
        "crc32": "2144df1c",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Judge/Ped_judge.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Judge/ped_judge.skin.xbx": {
        "crc32": "f5090956",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Judge/ped_judge.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Judge/ped_judge.tex.xbx": {
        "crc32": "5f0105e7",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Judge/ped_judge.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Nurse_TP/Ped_nurse_tp.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Nurse_TP/Ped_nurse_tp.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Nurse_TP/Ped_nurse_tp.col.xbx": {
        "crc32": "2144df1c",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Nurse_TP/Ped_nurse_tp.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Nurse_TP/ped_nurse_tp.skin.xbx": {
        "crc32": "d9bbbe03",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Nurse_TP/ped_nurse_tp.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Nurse_TP/ped_nurse_tp.tex.xbx": {
        "crc32": "62109f79",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Nurse_TP/ped_nurse_tp.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Peralta/Ped_peralta.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Peralta/Ped_peralta.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Peralta/Ped_peralta.col.xbx": {
        "crc32": "2144df1c",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Peralta/Ped_peralta.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Peralta/Ped_Peralta.skin.xbx": {
        "crc32": "30896aa2",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Peralta/Ped_Peralta.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Peralta/Ped_Peralta.tex.xbx": {
        "crc32": "e96e27b4",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Peralta/Ped_Peralta.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/ped_ss_satan01/ped_ss_satan01.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.12/data/models/Peds/ped_ss_satan01/ped_ss_satan01.cas.xbx",
        "version": "0.6.0.12"
    },
    "data/models/Peds/ped_ss_satan01/ped_ss_satan01.col.xbx": {
        "crc32": "3b9bc661",
        "link": "/update/beta/0.6.0.12/data/models/Peds/ped_ss_satan01/ped_ss_satan01.col.xbx",
        "version": "0.6.0.12"
    },
    "data/models/Peds/ped_ss_satan01/ped_ss_satan01.skin.xbx": {
        "crc32": "9645f4b2",
        "link": "/update/beta/0.6.0.12/data/models/Peds/ped_ss_satan01/ped_ss_satan01.skin.xbx",
        "version": "0.6.0.12"
    },
    "data/models/Peds/ped_ss_satan01/ped_ss_satan01.tex.xbx": {
        "crc32": "e80b18c7",
        "link": "/update/beta/0.6.0.12/data/models/Peds/ped_ss_satan01/ped_ss_satan01.tex.xbx",
        "version": "0.6.0.12"
    },
    "data/models/Peds/ped_ss_zombie01/ped_ss_zombie01.cas.xbx": {
        "crc32": "16eaa3fa",
        "link": "/update/beta/0.6.0.12/data/models/Peds/ped_ss_zombie01/ped_ss_zombie01.cas.xbx",
        "version": "0.6.0.12"
    },
    "data/models/Peds/ped_ss_zombie01/ped_ss_zombie01.col.xbx": {
        "crc32": "6fdaa77c",
        "link": "/update/beta/0.6.0.12/data/models/Peds/ped_ss_zombie01/ped_ss_zombie01.col.xbx",
        "version": "0.6.0.12"
    },
    "data/models/Peds/ped_ss_zombie01/ped_ss_zombie01.skin.xbx": {
        "crc32": "f783f71a",
        "link": "/update/beta/0.6.0.12/data/models/Peds/ped_ss_zombie01/ped_ss_zombie01.skin.xbx",
        "version": "0.6.0.12"
    },
    "data/models/Peds/ped_ss_zombie01/ped_ss_zombie01.tex.xbx": {
        "crc32": "af9b6456",
        "link": "/update/beta/0.6.0.12/data/models/Peds/ped_ss_zombie01/ped_ss_zombie01.tex.xbx",
        "version": "0.6.0.12"
    },
    "data/models/Peds/ped_ss_zombie02/ped_ss_zombie02.cas.xbx": {
        "crc32": "0ba97130",
        "link": "/update/beta/0.6.0.12/data/models/Peds/ped_ss_zombie02/ped_ss_zombie02.cas.xbx",
        "version": "0.6.0.12"
    },
    "data/models/Peds/ped_ss_zombie02/ped_ss_zombie02.col.xbx": {
        "crc32": "1c3362ed",
        "link": "/update/beta/0.6.0.12/data/models/Peds/ped_ss_zombie02/ped_ss_zombie02.col.xbx",
        "version": "0.6.0.12"
    },
    "data/models/Peds/ped_ss_zombie02/ped_ss_zombie02.skin.xbx": {
        "crc32": "c08e0259",
        "link": "/update/beta/0.6.0.12/data/models/Peds/ped_ss_zombie02/ped_ss_zombie02.skin.xbx",
        "version": "0.6.0.12"
    },
    "data/models/Peds/ped_ss_zombie02/ped_ss_zombie02.tex.xbx": {
        "crc32": "929c4287",
        "link": "/update/beta/0.6.0.12/data/models/Peds/ped_ss_zombie02/ped_ss_zombie02.tex.xbx",
        "version": "0.6.0.12"
    },
    "data/models/Peds/Ped_Todd/Ped_todd.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Todd/Ped_todd.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Todd/Ped_todd.col.xbx": {
        "crc32": "2144df1c",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Todd/Ped_todd.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Todd/Ped_Todd.skin.xbx": {
        "crc32": "5fb67072",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Todd/Ped_Todd.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Todd/Ped_Todd.tex.xbx": {
        "crc32": "da4e4205",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Todd/Ped_Todd.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Trooper/Ped_trooper.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Trooper/Ped_trooper.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Trooper/Ped_Trooper.col.xbx": {
        "crc32": "2144df1c",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Trooper/Ped_Trooper.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Trooper/Ped_Trooper.skin.xbx": {
        "crc32": "3efd7a55",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Trooper/Ped_Trooper.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Peds/Ped_Trooper/Ped_Trooper.tex.xbx": {
        "crc32": "23801a19",
        "link": "/update/beta/0.6.0.0/data/models/Peds/Ped_Trooper/Ped_Trooper.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Skater_Male/thugpro/Head_beaver.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/Skater_Male/thugpro/Head_beaver.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Skater_Male/thugpro/Head_beaver.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/Skater_Male/thugpro/Head_beaver.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Skater_Male/thugpro/Head_beaver.skin.xbx": {
        "crc32": "c6ce4c67",
        "link": "/update/beta/0.6.0.0/data/models/Skater_Male/thugpro/Head_beaver.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Skater_Male/thugpro/Head_beaver.tex.xbx": {
        "crc32": "cd7e9e6d",
        "link": "/update/beta/0.6.0.0/data/models/Skater_Male/thugpro/Head_beaver.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Skater_Male/thugpro/Head_Kenny.cas.xbx": {
        "crc32": "d5cb5f8d",
        "link": "/update/beta/0.6.0.0/data/models/Skater_Male/thugpro/Head_Kenny.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Skater_Male/thugpro/Head_Kenny.col.xbx": {
        "crc32": "21835d3e",
        "link": "/update/beta/0.6.0.0/data/models/Skater_Male/thugpro/Head_Kenny.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Skater_Male/thugpro/Head_Kenny.skin.xbx": {
        "crc32": "77f6d115",
        "link": "/update/beta/0.6.0.0/data/models/Skater_Male/thugpro/Head_Kenny.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/Skater_Male/thugpro/Head_Kenny.tex.xbx": {
        "crc32": "ab59fcae",
        "link": "/update/beta/0.6.0.0/data/models/Skater_Male/thugpro/Head_Kenny.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_burnquist_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_burnquist_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_burnquist_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_burnquist_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_burnquist_thug.skin.xbx": {
        "crc32": "ec224208",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_burnquist_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_burnquist_thug.tex.xbx": {
        "crc32": "55b72f58",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_burnquist_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_caballero_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_caballero_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_caballero_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_caballero_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_caballero_thug.skin.xbx": {
        "crc32": "9ca9b9f1",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_caballero_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_caballero_thug.tex.xbx": {
        "crc32": "b7782c08",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_caballero_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_campbell_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_campbell_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_campbell_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_campbell_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_campbell_thug.skin.xbx": {
        "crc32": "0c83f483",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_campbell_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_campbell_thug.tex.xbx": {
        "crc32": "879c98f2",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_campbell_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_glifberg_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_glifberg_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_glifberg_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_glifberg_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_glifberg_thug.skin.xbx": {
        "crc32": "89b049c7",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_glifberg_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_glifberg_thug.tex.xbx": {
        "crc32": "3024dd5b",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_glifberg_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_hawk_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_hawk_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_hawk_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_hawk_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_hawk_thug.skin.xbx": {
        "crc32": "4457abb6",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_hawk_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_hawk_thug.tex.xbx": {
        "crc32": "62ca649f",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_hawk_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_koston_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_koston_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_koston_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_koston_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_koston_thug.skin.xbx": {
        "crc32": "863f20cb",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_koston_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_koston_thug.tex.xbx": {
        "crc32": "1e758f75",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_koston_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_lasek_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_lasek_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_lasek_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_lasek_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/Skater_Lasek_thug.skin.xbx": {
        "crc32": "0abd4de7",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/Skater_Lasek_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/Skater_Lasek_thug.tex.xbx": {
        "crc32": "d3fe4cf5",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/Skater_Lasek_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_margera_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_margera_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_margera_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_margera_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_margera_thug.skin.xbx": {
        "crc32": "b3efaf4c",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_margera_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_margera_thug.tex.xbx": {
        "crc32": "e0d7ef73",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_margera_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_mullen_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_mullen_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_mullen_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_mullen_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_mullen_thug.skin.xbx": {
        "crc32": "46b4a8d5",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_mullen_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_mullen_thug.tex.xbx": {
        "crc32": "c4d8a8e8",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_mullen_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_muska_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_muska_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_muska_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_muska_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_muska_thug.skin.xbx": {
        "crc32": "f80fe841",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_muska_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_muska_thug.tex.xbx": {
        "crc32": "c6f0fdab",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_muska_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/Skater_Reynolds_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/Skater_Reynolds_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/Skater_Reynolds_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/Skater_Reynolds_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/Skater_Reynolds_thug.skin.xbx": {
        "crc32": "1747a27a",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/Skater_Reynolds_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/Skater_Reynolds_thug.tex.xbx": {
        "crc32": "e15c6063",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/Skater_Reynolds_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/Skater_Rodriguez_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/Skater_Rodriguez_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/Skater_Rodriguez_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/Skater_Rodriguez_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/Skater_Rodriguez_thug.skin.xbx": {
        "crc32": "d04d0cc7",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/Skater_Rodriguez_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/Skater_Rodriguez_thug.tex.xbx": {
        "crc32": "f7440df2",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/Skater_Rodriguez_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_rowley_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_rowley_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_rowley_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_rowley_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_Rowley_thug.skin.xbx": {
        "crc32": "a00d8525",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_Rowley_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_Rowley_thug.tex.xbx": {
        "crc32": "98d90ad8",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_Rowley_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_Saari_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_Saari_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_Saari_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_Saari_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/Skater_Saari_thug.skin.xbx": {
        "crc32": "1e0ddfb6",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/Skater_Saari_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/Skater_Saari_thug.tex.xbx": {
        "crc32": "484687a3",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/Skater_Saari_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_steamer_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_steamer_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_steamer_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_steamer_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_steamer_thug.skin.xbx": {
        "crc32": "925e58cf",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_steamer_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_steamer_thug.tex.xbx": {
        "crc32": "6548a018",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_steamer_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_thomas_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_thomas_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_thomas_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_thomas_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/Skater_thomas_thug.skin.xbx": {
        "crc32": "b2f653b9",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/Skater_thomas_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/Skater_thomas_thug.tex.xbx": {
        "crc32": "6c5d266c",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/Skater_thomas_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_vallely_thug.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_vallely_thug.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_vallely_thug.col.xbx": {
        "crc32": "b9ca5339",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_vallely_thug.col.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_vallely_thug.skin.xbx": {
        "crc32": "4443dd8c",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_vallely_thug.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_pro/skater_vallely_thug.tex.xbx": {
        "crc32": "aa363a1d",
        "link": "/update/beta/0.6.0.0/data/models/skater_pro/skater_vallely_thug.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_Creature.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_Creature.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_Creature.skin.xbx": {
        "crc32": "108f08af",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_Creature.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_Creature.tex.xbx": {
        "crc32": "a9fa84ca",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_Creature.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_daisy/Skater_Daisy.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_daisy/Skater_Daisy.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_daisy/Skater_Daisy.skin.xbx": {
        "crc32": "f7ad4bdf",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_daisy/Skater_Daisy.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_daisy/Skater_Daisy.tex.xbx": {
        "crc32": "c8acf2dd",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_daisy/Skater_Daisy.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_darthmaul/Skater_DarthMaul.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_darthmaul/Skater_DarthMaul.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_darthmaul/Skater_DarthMaul.skin.xbx": {
        "crc32": "b8198f6f",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_darthmaul/Skater_DarthMaul.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_darthmaul/Skater_DarthMaul.tex.xbx": {
        "crc32": "d43e8acc",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_darthmaul/Skater_DarthMaul.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_Demoness/Skater_demoness.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_Demoness/Skater_demoness.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_Demoness/skater_demoness.skin.xbx": {
        "crc32": "01ea6c29",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_Demoness/skater_demoness.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_Demoness/skater_demoness.tex.xbx": {
        "crc32": "69071afb",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_Demoness/skater_demoness.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_DoomGuy/Skater_DoomGuy.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_DoomGuy/Skater_DoomGuy.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_DoomGuy/Skater_DoomGuy.skin.xbx": {
        "crc32": "460a0e53",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_DoomGuy/Skater_DoomGuy.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_DoomGuy/Skater_DoomGuy.tex.xbx": {
        "crc32": "137abca1",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_DoomGuy/Skater_DoomGuy.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_eddie/Skater_Eddie.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_eddie/Skater_Eddie.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_eddie/Skater_Eddie.skin.xbx": {
        "crc32": "6f8b92af",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_eddie/Skater_Eddie.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_eddie/Skater_Eddie.tex.xbx": {
        "crc32": "e4568229",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_eddie/Skater_Eddie.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_Gene.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_Gene.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/skater_Gene.skin.xbx": {
        "crc32": "dea126ef",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/skater_Gene.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/skater_Gene.tex.xbx": {
        "crc32": "8dfc4898",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/skater_Gene.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_Ironman.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_Ironman.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_Ironman.skin.xbx": {
        "crc32": "77fe0ef4",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_Ironman.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_Ironman.tex.xbx": {
        "crc32": "b9106a04",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_Ironman.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_jango/Skater_Jango.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_jango/Skater_Jango.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_jango/Skater_Jango.skin.xbx": {
        "crc32": "cc738bc8",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_jango/Skater_Jango.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_jango/Skater_Jango.tex.xbx": {
        "crc32": "01b3d9aa",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_jango/Skater_Jango.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_KellySlater/Skater_KellySlater.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_KellySlater/Skater_KellySlater.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_KellySlater/Skater_KellySlater.skin.xbx": {
        "crc32": "02cdab52",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_KellySlater/Skater_KellySlater.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_KellySlater/Skater_KellySlater.tex.xbx": {
        "crc32": "a1dd31d6",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_KellySlater/Skater_KellySlater.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_NeversoftEyeball/Skater_neversofteyeball.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_NeversoftEyeball/Skater_neversofteyeball.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_NeversoftEyeball/skater_neversofteyeball.skin.xbx": {
        "crc32": "210c48f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_NeversoftEyeball/skater_neversofteyeball.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_NeversoftEyeball/skater_neversofteyeball.tex.xbx": {
        "crc32": "a942c7d2",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_NeversoftEyeball/skater_neversofteyeball.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_officerdick/Skater_OfficerDick.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_officerdick/Skater_OfficerDick.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_officerdick/Skater_OfficerDick.skin.xbx": {
        "crc32": "486e41f7",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_officerdick/Skater_OfficerDick.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_officerdick/Skater_OfficerDick.tex.xbx": {
        "crc32": "9c3b98e7",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_officerdick/Skater_OfficerDick.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_OllieTheMagicBum/Skater_OllieTheMagicBum.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_OllieTheMagicBum/Skater_OllieTheMagicBum.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_OllieTheMagicBum/Skater_OllieTheMagicBum.skin.xbx": {
        "crc32": "f9548bdf",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_OllieTheMagicBum/Skater_OllieTheMagicBum.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_OllieTheMagicBum/Skater_OllieTheMagicBum.tex.xbx": {
        "crc32": "d35b4cd4",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_OllieTheMagicBum/Skater_OllieTheMagicBum.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_Price.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_Price.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/skater_price.skin.xbx": {
        "crc32": "1b77a590",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/skater_price.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/skater_price.tex.xbx": {
        "crc32": "133b4073",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/skater_price.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_PrivateCarrera/Skater_privatecarrera.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_PrivateCarrera/Skater_privatecarrera.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_PrivateCarrera/skater_privatecarrera.skin.xbx": {
        "crc32": "b9d3be5d",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_PrivateCarrera/skater_privatecarrera.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_PrivateCarrera/skater_privatecarrera.tex.xbx": {
        "crc32": "25c643eb",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_PrivateCarrera/skater_privatecarrera.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_rasta/Skater_Rasta.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_rasta/Skater_Rasta.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_rasta/Skater_Rasta.skin.xbx": {
        "crc32": "8a86a635",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_rasta/Skater_Rasta.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_rasta/Skater_Rasta.tex.xbx": {
        "crc32": "02b6f37a",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_rasta/Skater_Rasta.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_wolverine/Skater_Wolverine.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_wolverine/Skater_Wolverine.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_wolverine/Skater_Wolverine.skin.xbx": {
        "crc32": "61371efd",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_wolverine/Skater_Wolverine.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_wolverine/Skater_Wolverine.tex.xbx": {
        "crc32": "b2fdd798",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_wolverine/Skater_Wolverine.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_xray/Skater_Xray.cas.xbx": {
        "crc32": "97ee58f0",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_xray/Skater_Xray.cas.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_xray/Skater_Xray.skin.xbx": {
        "crc32": "ea2d8e31",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_xray/Skater_Xray.skin.xbx",
        "version": "0.6.0.0"
    },
    "data/models/skater_secret/Skater_xray/Skater_Xray.tex.xbx": {
        "crc32": "6e6f5476",
        "link": "/update/beta/0.6.0.0/data/models/skater_secret/Skater_xray/Skater_Xray.tex.xbx",
        "version": "0.6.0.0"
    },
    "data/pre/ALC_scripts.prx": {
        "crc32": "5f70da76",
        "link": "/update/beta/0.6.0.1/data/pre/ALC_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/ALCcol.prx": {
        "crc32": "bc3ae339",
        "link": "/update/beta/0.6.0.1/data/pre/ALCcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/ALCscn.prx": {
        "crc32": "667c65c0",
        "link": "/update/beta/0.6.0.15/data/pre/ALCscn.prx",
        "version": "0.6.0.15"
    },
    "data/pre/APcol_thugpro.prx": {
        "crc32": "43824f25",
        "link": "/update/beta/0.6.0.1/data/pre/APcol_thugpro.prx",
        "version": "0.6.0.1"
    },
    "data/pre/atlanta_scripts.prx": {
        "crc32": "0c282032",
        "link": "/update/beta/0.6.0.4/data/pre/atlanta_scripts.prx",
        "version": "0.6.0.4"
    },
    "data/pre/atlantacol.prx": {
        "crc32": "3d219891",
        "link": "/update/beta/0.6.0.1/data/pre/atlantacol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/atlantascn.prx": {
        "crc32": "d9410638",
        "link": "/update/beta/0.6.0.16/data/pre/atlantascn.prx",
        "version": "0.6.0.16"
    },
    "data/pre/burn_scripts.prx": {
        "crc32": "d81e039a",
        "link": "/update/beta/0.6.0.1/data/pre/burn_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/burncol.prx": {
        "crc32": "fae02ee3",
        "link": "/update/beta/0.6.0.1/data/pre/burncol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/burnscn.prx": {
        "crc32": "24e9898e",
        "link": "/update/beta/0.6.0.1/data/pre/burnscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/CNV_scripts.prx": {
        "crc32": "5d4d3810",
        "link": "/update/beta/0.6.0.1/data/pre/CNV_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/CNVcol.prx": {
        "crc32": "b21d0dd3",
        "link": "/update/beta/0.6.0.1/data/pre/CNVcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/CNVscn.prx": {
        "crc32": "545548dc",
        "link": "/update/beta/0.6.0.1/data/pre/CNVscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/djcol_thugpro.prx": {
        "crc32": "4c0aee65",
        "link": "/update/beta/0.6.0.1/data/pre/djcol_thugpro.prx",
        "version": "0.6.0.1"
    },
    "data/pre/FL_scripts.prx": {
        "crc32": "08fe7a6c",
        "link": "/update/beta/0.6.0.4/data/pre/FL_scripts.prx",
        "version": "0.6.0.4"
    },
    "data/pre/FLcol.prx": {
        "crc32": "d9f007a7",
        "link": "/update/beta/0.6.0.1/data/pre/FLcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/FLscn.prx": {
        "crc32": "4a4eadd9",
        "link": "/update/beta/0.6.0.1/data/pre/FLscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/FOUN_scripts.prx": {
        "crc32": "1218b3e3",
        "link": "/update/beta/0.6.0.1/data/pre/FOUN_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/FOUNcol.prx": {
        "crc32": "c51860d4",
        "link": "/update/beta/0.6.0.1/data/pre/FOUNcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/FOUNscn.prx": {
        "crc32": "e4ef924a",
        "link": "/update/beta/0.6.0.16/data/pre/FOUNscn.prx",
        "version": "0.6.0.16"
    },
    "data/pre/HH_scripts.prx": {
        "crc32": "9ddf58a5",
        "link": "/update/beta/0.6.0.4/data/pre/HH_scripts.prx",
        "version": "0.6.0.4"
    },
    "data/pre/HHcol.prx": {
        "crc32": "6985d6bd",
        "link": "/update/beta/0.6.0.1/data/pre/HHcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/HHscn.prx": {
        "crc32": "15b06d42",
        "link": "/update/beta/0.6.0.1/data/pre/HHscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/HI_scripts.prx": {
        "crc32": "7af55124",
        "link": "/update/beta/0.6.0.4/data/pre/HI_scripts.prx",
        "version": "0.6.0.4"
    },
    "data/pre/HIcol.prx": {
        "crc32": "0efa5a31",
        "link": "/update/beta/0.6.0.1/data/pre/HIcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/hisch_scripts.prx": {
        "crc32": "7c6ca0ed",
        "link": "/update/beta/0.6.0.13/data/pre/hisch_scripts.prx",
        "version": "0.6.0.13"
    },
    "data/pre/hischcol.prx": {
        "crc32": "c62f9044",
        "link": "/update/beta/0.6.0.1/data/pre/hischcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/hischscn.prx": {
        "crc32": "ab868fd6",
        "link": "/update/beta/0.6.0.1/data/pre/hischscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/HIscn.prx": {
        "crc32": "033ca4e0",
        "link": "/update/beta/0.6.0.1/data/pre/HIscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/HN_scripts.prx": {
        "crc32": "e926631f",
        "link": "/update/beta/0.6.0.15/data/pre/HN_scripts.prx",
        "version": "0.6.0.15"
    },
    "data/pre/HNcol.prx": {
        "crc32": "2af48291",
        "link": "/update/beta/0.6.0.1/data/pre/HNcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/HNscn.prx": {
        "crc32": "c77c4672",
        "link": "/update/beta/0.6.0.1/data/pre/HNscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/HOF_scripts.prx": {
        "crc32": "bc74c015",
        "link": "/update/beta/0.6.0.4/data/pre/HOF_scripts.prx",
        "version": "0.6.0.4"
    },
    "data/pre/HOFcol.prx": {
        "crc32": "9e63164e",
        "link": "/update/beta/0.6.0.1/data/pre/HOFcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/HOFscn.prx": {
        "crc32": "8b91b844",
        "link": "/update/beta/0.6.0.1/data/pre/HOFscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/JNK_scripts.prx": {
        "crc32": "36220b79",
        "link": "/update/beta/0.6.0.15/data/pre/JNK_scripts.prx",
        "version": "0.6.0.15"
    },
    "data/pre/JNKcol.prx": {
        "crc32": "cc3676e9",
        "link": "/update/beta/0.6.0.1/data/pre/JNKcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/JNKscn.prx": {
        "crc32": "bb917d63",
        "link": "/update/beta/0.6.0.1/data/pre/JNKscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/KON_scripts.prx": {
        "crc32": "cac4f846",
        "link": "/update/beta/0.6.0.1/data/pre/KON_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/KONcol.prx": {
        "crc32": "2ebf2705",
        "link": "/update/beta/0.6.0.1/data/pre/KONcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/KONscn.prx": {
        "crc32": "7d615505",
        "link": "/update/beta/0.6.0.1/data/pre/KONscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/kyoto_scripts.prx": {
        "crc32": "4a41a3d5",
        "link": "/update/beta/0.6.0.1/data/pre/kyoto_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/kyotocol.prx": {
        "crc32": "c15c01e5",
        "link": "/update/beta/0.6.0.1/data/pre/kyotocol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/kyotoscn.prx": {
        "crc32": "98140dff",
        "link": "/update/beta/0.6.0.16/data/pre/kyotoscn.prx",
        "version": "0.6.0.16"
    },
    "data/pre/LON_scripts.prx": {
        "crc32": "34f046ac",
        "link": "/update/beta/0.6.0.1/data/pre/LON_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/LONcol.prx": {
        "crc32": "0176e63e",
        "link": "/update/beta/0.6.0.1/data/pre/LONcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/LONscn.prx": {
        "crc32": "0eb73857",
        "link": "/update/beta/0.6.0.1/data/pre/LONscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/NJ_scripts.prx": {
        "crc32": "aafca129",
        "link": "/update/beta/0.6.0.4/data/pre/NJ_scripts.prx",
        "version": "0.6.0.4"
    },
    "data/pre/NJcol.prx": {
        "crc32": "d36e8604",
        "link": "/update/beta/0.6.0.1/data/pre/NJcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/NJscn.prx": {
        "crc32": "61870841",
        "link": "/update/beta/0.6.0.1/data/pre/NJscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/NY_scripts.prx": {
        "crc32": "c6f0d225",
        "link": "/update/beta/0.6.0.8/data/pre/NY_scripts.prx",
        "version": "0.6.0.8"
    },
    "data/pre/NYcol.prx": {
        "crc32": "f768c552",
        "link": "/update/beta/0.6.0.1/data/pre/NYcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/NYscn.prx": {
        "crc32": "b2691e9b",
        "link": "/update/beta/0.6.0.1/data/pre/NYscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/OIL_scripts.prx": {
        "crc32": "0b78571f",
        "link": "/update/beta/0.6.0.15/data/pre/OIL_scripts.prx",
        "version": "0.6.0.15"
    },
    "data/pre/OILcol.prx": {
        "crc32": "1629440a",
        "link": "/update/beta/0.6.0.1/data/pre/OILcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/OILscn.prx": {
        "crc32": "8ee91b77",
        "link": "/update/beta/0.6.0.1/data/pre/OILscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/Practice_scripts.prx": {
        "crc32": "83f5ea95",
        "link": "/update/beta/0.6.0.1/data/pre/Practice_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/Practicecol.prx": {
        "crc32": "e5ca2757",
        "link": "/update/beta/0.6.0.1/data/pre/Practicecol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/Practicescn.prx": {
        "crc32": "20c0f72c",
        "link": "/update/beta/0.6.0.1/data/pre/Practicescn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/RIO_scripts.prx": {
        "crc32": "1e7b3e12",
        "link": "/update/beta/0.6.0.1/data/pre/RIO_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/RIOcol.prx": {
        "crc32": "e8078360",
        "link": "/update/beta/0.6.0.1/data/pre/RIOcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/RIOscn.prx": {
        "crc32": "f4b73308",
        "link": "/update/beta/0.6.0.1/data/pre/RIOscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/ros_scripts.prx": {
        "crc32": "35a2b8a4",
        "link": "/update/beta/0.6.0.1/data/pre/ros_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/roscol.prx": {
        "crc32": "97c624c2",
        "link": "/update/beta/0.6.0.1/data/pre/roscol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/rosscn.prx": {
        "crc32": "6f835298",
        "link": "/update/beta/0.6.0.1/data/pre/rosscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/RU_scripts.prx": {
        "crc32": "6ae45cdb",
        "link": "/update/beta/0.6.0.9/data/pre/RU_scripts.prx",
        "version": "0.6.0.9"
    },
    "data/pre/RUcol.prx": {
        "crc32": "2b3a222a",
        "link": "/update/beta/0.6.0.1/data/pre/RUcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/RUscn.prx": {
        "crc32": "47551d17",
        "link": "/update/beta/0.6.0.1/data/pre/RUscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SC2_scripts.prx": {
        "crc32": "17b109dc",
        "link": "/update/beta/0.6.0.15/data/pre/SC2_scripts.prx",
        "version": "0.6.0.15"
    },
    "data/pre/SC2col.prx": {
        "crc32": "f82d1ed8",
        "link": "/update/beta/0.6.0.15/data/pre/SC2col.prx",
        "version": "0.6.0.15"
    },
    "data/pre/SC2scn.prx": {
        "crc32": "a8263492",
        "link": "/update/beta/0.6.0.15/data/pre/SC2scn.prx",
        "version": "0.6.0.15"
    },
    "data/pre/sccol_thugpro.prx": {
        "crc32": "5864b1b5",
        "link": "/update/beta/0.6.0.1/data/pre/sccol_thugpro.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SCH_scripts.prx": {
        "crc32": "70bd1bbc",
        "link": "/update/beta/0.6.0.1/data/pre/SCH_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SCHcol.prx": {
        "crc32": "e161d256",
        "link": "/update/beta/0.6.0.9/data/pre/SCHcol.prx",
        "version": "0.6.0.9"
    },
    "data/pre/SCHscn.prx": {
        "crc32": "fae02ca6",
        "link": "/update/beta/0.6.0.15/data/pre/SCHscn.prx",
        "version": "0.6.0.15"
    },
    "data/pre/SD_scripts.prx": {
        "crc32": "72c02d30",
        "link": "/update/beta/0.6.0.4/data/pre/SD_scripts.prx",
        "version": "0.6.0.4"
    },
    "data/pre/SDcol.prx": {
        "crc32": "7d62ae0c",
        "link": "/update/beta/0.6.0.1/data/pre/SDcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SDscn.prx": {
        "crc32": "c0ebe0c5",
        "link": "/update/beta/0.6.0.1/data/pre/SDscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SF2_scripts.prx": {
        "crc32": "5b62cd84",
        "link": "/update/beta/0.6.0.1/data/pre/SF2_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SF2col.prx": {
        "crc32": "c77f4632",
        "link": "/update/beta/0.6.0.1/data/pre/SF2col.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SF2scn.prx": {
        "crc32": "01feb8a4",
        "link": "/update/beta/0.6.0.1/data/pre/SF2scn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SHP_scripts.prx": {
        "crc32": "88191f72",
        "link": "/update/beta/0.6.0.1/data/pre/SHP_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SHPcol.prx": {
        "crc32": "e8236678",
        "link": "/update/beta/0.6.0.1/data/pre/SHPcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SHPscn.prx": {
        "crc32": "f9cddd9c",
        "link": "/update/beta/0.6.0.1/data/pre/SHPscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SI_scripts.prx": {
        "crc32": "2e7dc05d",
        "link": "/update/beta/0.6.0.1/data/pre/SI_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SIcol.prx": {
        "crc32": "69335011",
        "link": "/update/beta/0.6.0.1/data/pre/SIcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SIscn.prx": {
        "crc32": "17b3bbe1",
        "link": "/update/beta/0.6.0.1/data/pre/SIscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SJ_scripts.prx": {
        "crc32": "7d7b9ea9",
        "link": "/update/beta/0.6.0.4/data/pre/SJ_scripts.prx",
        "version": "0.6.0.4"
    },
    "data/pre/SJcol.prx": {
        "crc32": "586aad73",
        "link": "/update/beta/0.6.0.1/data/pre/SJcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SJscn.prx": {
        "crc32": "65684823",
        "link": "/update/beta/0.6.0.1/data/pre/SJscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/sk5ed10_shellscn.prx": {
        "crc32": "eb9e3c5b",
        "link": "/update/beta/0.6.0.1/data/pre/sk5ed10_shellscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/sk5ed11_shellscn.prx": {
        "crc32": "0957d342",
        "link": "/update/beta/0.6.0.1/data/pre/sk5ed11_shellscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/sk5ed12_shellscn.prx": {
        "crc32": "295aefd3",
        "link": "/update/beta/0.6.0.1/data/pre/sk5ed12_shellscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/sk5ed13_shellscn.prx": {
        "crc32": "2baef7ff",
        "link": "/update/beta/0.6.0.13/data/pre/sk5ed13_shellscn.prx",
        "version": "0.6.0.13"
    },
    "data/pre/sk5ed14_shellscn.prx": {
        "crc32": "69391925",
        "link": "/update/beta/0.6.0.1/data/pre/sk5ed14_shellscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/sk5ed15_shellscn.prx": {
        "crc32": "a6106d65",
        "link": "/update/beta/0.6.0.1/data/pre/sk5ed15_shellscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/sk5ed16_shellscn.prx": {
        "crc32": "50e724b9",
        "link": "/update/beta/0.6.0.1/data/pre/sk5ed16_shellscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/sk5ed17_shellcol.prx": {
        "crc32": "21d0cb2f",
        "link": "/update/beta/0.6.0.1/data/pre/sk5ed17_shellcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/sk5ed17_shellscn.prx": {
        "crc32": "ba545244",
        "link": "/update/beta/0.6.0.1/data/pre/sk5ed17_shellscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/sk5ed6_shellscn.prx": {
        "crc32": "66ede553",
        "link": "/update/beta/0.6.0.1/data/pre/sk5ed6_shellscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/sk5ed7_shellscn.prx": {
        "crc32": "c55f33eb",
        "link": "/update/beta/0.6.0.1/data/pre/sk5ed7_shellscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/sk5ed8_shellscn.prx": {
        "crc32": "e0e3b811",
        "link": "/update/beta/0.6.0.1/data/pre/sk5ed8_shellscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/sk5ed9_shellscn.prx": {
        "crc32": "e7ba536d",
        "link": "/update/beta/0.6.0.1/data/pre/sk5ed9_shellscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/skatepark_scripts.prx": {
        "crc32": "7e03ad91",
        "link": "/update/beta/0.6.0.1/data/pre/skatepark_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/skateparkcol.prx": {
        "crc32": "d300243d",
        "link": "/update/beta/0.6.0.1/data/pre/skateparkcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/skateparkscn.prx": {
        "crc32": "00e81357",
        "link": "/update/beta/0.6.0.1/data/pre/skateparkscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/Skateshop_scripts.prx": {
        "crc32": "75a9997b",
        "link": "/update/beta/0.6.0.16/data/pre/Skateshop_scripts.prx",
        "version": "0.6.0.16"
    },
    "data/pre/Skateshopcol.prx": {
        "crc32": "7bd4ff67",
        "link": "/update/beta/0.6.0.1/data/pre/Skateshopcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/Skateshopscn.prx": {
        "crc32": "beb1160a",
        "link": "/update/beta/0.6.0.1/data/pre/Skateshopscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SkProDefault_Scripts.prx": {
        "crc32": "96d5757b",
        "link": "/update/beta/0.6.0.1/data/pre/SkProDefault_Scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SUB_scripts.prx": {
        "crc32": "633a19f0",
        "link": "/update/beta/0.6.0.1/data/pre/SUB_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SUBcol.prx": {
        "crc32": "76467245",
        "link": "/update/beta/0.6.0.11/data/pre/SUBcol.prx",
        "version": "0.6.0.11"
    },
    "data/pre/SUBscn.prx": {
        "crc32": "fc9bceac",
        "link": "/update/beta/0.6.0.1/data/pre/SUBscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SZ_scripts.prx": {
        "crc32": "19362ef3",
        "link": "/update/beta/0.6.0.1/data/pre/SZ_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SZcol.prx": {
        "crc32": "1fd57898",
        "link": "/update/beta/0.6.0.1/data/pre/SZcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/SZscn.prx": {
        "crc32": "b6322fcb",
        "link": "/update/beta/0.6.0.1/data/pre/SZscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/thugpro_anims.prx": {
        "crc32": "60378778",
        "link": "/update/beta/0.6.0.11/data/pre/thugpro_anims.prx",
        "version": "0.6.0.11"
    },
    "data/pre/thugpro_ap.prx": {
        "crc32": "4e21c37c",
        "link": "/update/beta/0.6.0.1/data/pre/thugpro_ap.prx",
        "version": "0.6.0.1"
    },
    "data/pre/thugpro_au.prx": {
        "crc32": "c51402f8",
        "link": "/update/beta/0.6.0.1/data/pre/thugpro_au.prx",
        "version": "0.6.0.1"
    },
    "data/pre/thugpro_ba.prx": {
        "crc32": "8cd14a5a",
        "link": "/update/beta/0.6.0.1/data/pre/thugpro_ba.prx",
        "version": "0.6.0.1"
    },
    "data/pre/thugpro_be.prx": {
        "crc32": "77f36b41",
        "link": "/update/beta/0.6.0.1/data/pre/thugpro_be.prx",
        "version": "0.6.0.1"
    },
    "data/pre/thugpro_bo.prx": {
        "crc32": "49eb5c2e",
        "link": "/update/beta/0.6.0.1/data/pre/thugpro_bo.prx",
        "version": "0.6.0.1"
    },
    "data/pre/thugpro_fonts.prx": {
        "crc32": "470bb974",
        "link": "/update/beta/0.6.0.1/data/pre/thugpro_fonts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/thugpro_images.prx": {
        "crc32": "6c13d5f6",
        "link": "/update/beta/0.6.0.1/data/pre/thugpro_images.prx",
        "version": "0.6.0.1"
    },
    "data/pre/thugpro_levelselect.prx": {
        "crc32": "1338830d",
        "link": "/update/beta/0.6.0.15/data/pre/thugpro_levelselect.prx",
        "version": "0.6.0.15"
    },
    "data/pre/thugpro_models.prx": {
        "crc32": "70e1ea51",
        "link": "/update/beta/0.6.0.8/data/pre/thugpro_models.prx",
        "version": "0.6.0.8"
    },
    "data/pre/thugpro_ph.prx": {
        "crc32": "f512b352",
        "link": "/update/beta/0.6.0.1/data/pre/thugpro_ph.prx",
        "version": "0.6.0.1"
    },
    "data/pre/thugpro_qb.prx": {
        "crc32": "ce3e95a2",
        "link": "/update/beta/0.6.0.16/data/pre/thugpro_qb.prx",
        "version": "0.6.0.16"
    },
    "data/pre/thugpro_sc.prx": {
        "crc32": "3811f3e1",
        "link": "/update/beta/0.6.0.1/data/pre/thugpro_sc.prx",
        "version": "0.6.0.1"
    },
    "data/pre/thugpro_sk5ed.prx": {
        "crc32": "37be761d",
        "link": "/update/beta/0.6.0.12/data/pre/thugpro_sk5ed.prx",
        "version": "0.6.0.12"
    },
    "data/pre/thugpro_sk5edcol.prx": {
        "crc32": "da8470bb",
        "link": "/update/beta/0.6.0.12/data/pre/thugpro_sk5edcol.prx",
        "version": "0.6.0.12"
    },
    "data/pre/thugpro_sk5edscn.prx": {
        "crc32": "7c11d864",
        "link": "/update/beta/0.6.0.12/data/pre/thugpro_sk5edscn.prx",
        "version": "0.6.0.12"
    },
    "data/pre/thugpro_st.prx": {
        "crc32": "8947c4bd",
        "link": "/update/beta/0.6.0.1/data/pre/thugpro_st.prx",
        "version": "0.6.0.1"
    },
    "data/pre/thugpro_themes.prx": {
        "crc32": "44422c4a",
        "link": "/update/beta/0.6.0.1/data/pre/thugpro_themes.prx",
        "version": "0.6.0.1"
    },
    "data/pre/thugpro_tr.prx": {
        "crc32": "2c7033f6",
        "link": "/update/beta/0.6.0.1/data/pre/thugpro_tr.prx",
        "version": "0.6.0.1"
    },
    "data/pre/TOK_scripts.prx": {
        "crc32": "9396e188",
        "link": "/update/beta/0.6.0.13/data/pre/TOK_scripts.prx",
        "version": "0.6.0.13"
    },
    "data/pre/TOKcol.prx": {
        "crc32": "33f3a6d2",
        "link": "/update/beta/0.6.0.1/data/pre/TOKcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/TOKscn.prx": {
        "crc32": "8334c7d8",
        "link": "/update/beta/0.6.0.1/data/pre/TOKscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/toystory_bedroom_scripts.prx": {
        "crc32": "eadda5fc",
        "link": "/update/beta/0.6.0.1/data/pre/toystory_bedroom_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/toystory_bedroomcol.prx": {
        "crc32": "bacc4fad",
        "link": "/update/beta/0.6.0.1/data/pre/toystory_bedroomcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/toystory_bedroomscn.prx": {
        "crc32": "31f49487",
        "link": "/update/beta/0.6.0.1/data/pre/toystory_bedroomscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/TRcol_thugpro.prx": {
        "crc32": "c20983f7",
        "link": "/update/beta/0.6.0.1/data/pre/TRcol_thugpro.prx",
        "version": "0.6.0.1"
    },
    "data/pre/TRscn_thugpro.prx": {
        "crc32": "3bef4255",
        "link": "/update/beta/0.6.0.1/data/pre/TRscn_thugpro.prx",
        "version": "0.6.0.1"
    },
    "data/pre/VANS_scripts.prx": {
        "crc32": "b1d955b2",
        "link": "/update/beta/0.6.0.1/data/pre/VANS_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/VANScol.prx": {
        "crc32": "1295c1d0",
        "link": "/update/beta/0.6.0.1/data/pre/VANScol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/VANSscn.prx": {
        "crc32": "50fc818e",
        "link": "/update/beta/0.6.0.16/data/pre/VANSscn.prx",
        "version": "0.6.0.16"
    },
    "data/pre/VC_scripts.prx": {
        "crc32": "89f45451",
        "link": "/update/beta/0.6.0.4/data/pre/VC_scripts.prx",
        "version": "0.6.0.4"
    },
    "data/pre/VCcol.prx": {
        "crc32": "3f1c43fc",
        "link": "/update/beta/0.6.0.1/data/pre/VCcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/VCscn.prx": {
        "crc32": "ea86a266",
        "link": "/update/beta/0.6.0.1/data/pre/VCscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/VN_scripts.prx": {
        "crc32": "93d01ea9",
        "link": "/update/beta/0.6.0.15/data/pre/VN_scripts.prx",
        "version": "0.6.0.15"
    },
    "data/pre/VNcol.prx": {
        "crc32": "2158020a",
        "link": "/update/beta/0.6.0.1/data/pre/VNcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/VNscn.prx": {
        "crc32": "339de4dc",
        "link": "/update/beta/0.6.0.1/data/pre/VNscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/ware_scripts.prx": {
        "crc32": "8a5c4518",
        "link": "/update/beta/0.6.0.1/data/pre/ware_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/warecol.prx": {
        "crc32": "0db89a1b",
        "link": "/update/beta/0.6.0.11/data/pre/warecol.prx",
        "version": "0.6.0.11"
    },
    "data/pre/warescn.prx": {
        "crc32": "d8116687",
        "link": "/update/beta/0.6.0.11/data/pre/warescn.prx",
        "version": "0.6.0.11"
    },
    "data/pre/Z_BH_scripts.prx": {
        "crc32": "6bf1d1c7",
        "link": "/update/beta/0.6.0.15/data/pre/Z_BH_scripts.prx",
        "version": "0.6.0.15"
    },
    "data/pre/Z_BHcol.prx": {
        "crc32": "f863e885",
        "link": "/update/beta/0.6.0.13/data/pre/Z_BHcol.prx",
        "version": "0.6.0.13"
    },
    "data/pre/Z_BHscn.prx": {
        "crc32": "5e587bad",
        "link": "/update/beta/0.6.0.16/data/pre/Z_BHscn.prx",
        "version": "0.6.0.16"
    },
    "data/pre/z_center_scripts.prx": {
        "crc32": "7842d249",
        "link": "/update/beta/0.6.0.1/data/pre/z_center_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/z_centercol.prx": {
        "crc32": "5dc72a49",
        "link": "/update/beta/0.6.0.1/data/pre/z_centercol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/z_centerscn.prx": {
        "crc32": "8297e617",
        "link": "/update/beta/0.6.0.1/data/pre/z_centerscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/z_dn_scripts.prx": {
        "crc32": "ab9828a7",
        "link": "/update/beta/0.6.0.2/data/pre/z_dn_scripts.prx",
        "version": "0.6.0.2"
    },
    "data/pre/z_dncol.prx": {
        "crc32": "986786d5",
        "link": "/update/beta/0.6.0.1/data/pre/z_dncol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/z_dnscn.prx": {
        "crc32": "c929a15c",
        "link": "/update/beta/0.6.0.1/data/pre/z_dnscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/Z_EL_scripts.prx": {
        "crc32": "af004305",
        "link": "/update/beta/0.6.0.11/data/pre/Z_EL_scripts.prx",
        "version": "0.6.0.11"
    },
    "data/pre/Z_ELcol.prx": {
        "crc32": "85adb64a",
        "link": "/update/beta/0.6.0.1/data/pre/Z_ELcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/Z_ELscn.prx": {
        "crc32": "16a17508",
        "link": "/update/beta/0.6.0.16/data/pre/Z_ELscn.prx",
        "version": "0.6.0.16"
    },
    "data/pre/z_funpark_scripts.prx": {
        "crc32": "2ac8bb48",
        "link": "/update/beta/0.6.0.1/data/pre/z_funpark_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/z_funparkcol.prx": {
        "crc32": "72e1c37c",
        "link": "/update/beta/0.6.0.1/data/pre/z_funparkcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/z_funparkscn.prx": {
        "crc32": "8efbbdb5",
        "link": "/update/beta/0.6.0.1/data/pre/z_funparkscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/z_ma_scripts.prx": {
        "crc32": "18032a68",
        "link": "/update/beta/0.6.0.11/data/pre/z_ma_scripts.prx",
        "version": "0.6.0.11"
    },
    "data/pre/z_macol.prx": {
        "crc32": "5c6e6d7c",
        "link": "/update/beta/0.6.0.11/data/pre/z_macol.prx",
        "version": "0.6.0.11"
    },
    "data/pre/z_mascn.prx": {
        "crc32": "34768df8",
        "link": "/update/beta/0.6.0.13/data/pre/z_mascn.prx",
        "version": "0.6.0.13"
    },
    "data/pre/z_ms_scripts.prx": {
        "crc32": "6e3f8722",
        "link": "/update/beta/0.6.0.7/data/pre/z_ms_scripts.prx",
        "version": "0.6.0.7"
    },
    "data/pre/z_mscol.prx": {
        "crc32": "19ea85af",
        "link": "/update/beta/0.6.0.7/data/pre/z_mscol.prx",
        "version": "0.6.0.7"
    },
    "data/pre/z_msscn.prx": {
        "crc32": "c0faa003",
        "link": "/update/beta/0.6.0.7/data/pre/z_msscn.prx",
        "version": "0.6.0.7"
    },
    "data/pre/z_riod_scripts.prx": {
        "crc32": "cff1cb51",
        "link": "/update/beta/0.6.0.4/data/pre/z_riod_scripts.prx",
        "version": "0.6.0.4"
    },
    "data/pre/z_riodcol.prx": {
        "crc32": "ef37ad87",
        "link": "/update/beta/0.6.0.1/data/pre/z_riodcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/z_riodscn.prx": {
        "crc32": "57a5f0ba",
        "link": "/update/beta/0.6.0.1/data/pre/z_riodscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/Z_SM_scripts.prx": {
        "crc32": "38cc09cf",
        "link": "/update/beta/0.6.0.11/data/pre/Z_SM_scripts.prx",
        "version": "0.6.0.11"
    },
    "data/pre/Z_SMcol.prx": {
        "crc32": "8d21ca01",
        "link": "/update/beta/0.6.0.1/data/pre/Z_SMcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/Z_SMscn.prx": {
        "crc32": "841084b9",
        "link": "/update/beta/0.6.0.1/data/pre/Z_SMscn.prx",
        "version": "0.6.0.1"
    },
    "data/pre/Z_SR_scripts.prx": {
        "crc32": "3d2cd38b",
        "link": "/update/beta/0.6.0.15/data/pre/Z_SR_scripts.prx",
        "version": "0.6.0.15"
    },
    "data/pre/Z_SRcol.prx": {
        "crc32": "4f38311d",
        "link": "/update/beta/0.6.0.15/data/pre/Z_SRcol.prx",
        "version": "0.6.0.15"
    },
    "data/pre/Z_SRscn.prx": {
        "crc32": "276e8e9d",
        "link": "/update/beta/0.6.0.16/data/pre/Z_SRscn.prx",
        "version": "0.6.0.16"
    },
    "data/pre/Z_SV2_scripts.prx": {
        "crc32": "58bbf26d",
        "link": "/update/beta/0.6.0.15/data/pre/Z_SV2_scripts.prx",
        "version": "0.6.0.15"
    },
    "data/pre/Z_SV2col.prx": {
        "crc32": "227fb65f",
        "link": "/update/beta/0.6.0.15/data/pre/Z_SV2col.prx",
        "version": "0.6.0.15"
    },
    "data/pre/Z_SV2scn.prx": {
        "crc32": "a76bdca6",
        "link": "/update/beta/0.6.0.16/data/pre/Z_SV2scn.prx",
        "version": "0.6.0.16"
    },
    "data/pre/ZOO_scripts.prx": {
        "crc32": "e4e8e2f6",
        "link": "/update/beta/0.6.0.1/data/pre/ZOO_scripts.prx",
        "version": "0.6.0.1"
    },
    "data/pre/ZOOcol.prx": {
        "crc32": "60a97e83",
        "link": "/update/beta/0.6.0.1/data/pre/ZOOcol.prx",
        "version": "0.6.0.1"
    },
    "data/pre/ZOOscn.prx": {
        "crc32": "64022885",
        "link": "/update/beta/0.6.0.1/data/pre/ZOOscn.prx",
        "version": "0.6.0.1"
    },
    "data/sounds/alc/baseballcrack.snd": {
        "crc32": "4110ee9c",
        "link": "/update/beta/0.6.0.0/data/sounds/alc/baseballcrack.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/alc/CellDoorOpen.snd": {
        "crc32": "3ff5dac4",
        "link": "/update/beta/0.6.0.0/data/sounds/alc/CellDoorOpen.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/alc/ColumnCrumble.snd": {
        "crc32": "202faf92",
        "link": "/update/beta/0.6.0.0/data/sounds/alc/ColumnCrumble.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/alc/ColumnCrumble2.snd": {
        "crc32": "ed0fcb0f",
        "link": "/update/beta/0.6.0.0/data/sounds/alc/ColumnCrumble2.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/alc/Lampshatter1.snd": {
        "crc32": "c2579863",
        "link": "/update/beta/0.6.0.0/data/sounds/alc/Lampshatter1.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/alc/Lampshatter2.snd": {
        "crc32": "a98509c0",
        "link": "/update/beta/0.6.0.0/data/sounds/alc/Lampshatter2.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/alc/Lampshatter3.snd": {
        "crc32": "f050b4ce",
        "link": "/update/beta/0.6.0.0/data/sounds/alc/Lampshatter3.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/alc/Lampshatter4.snd": {
        "crc32": "f1e88b63",
        "link": "/update/beta/0.6.0.0/data/sounds/alc/Lampshatter4.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/alc/ShoppingCartBail.snd": {
        "crc32": "46eb12f1",
        "link": "/update/beta/0.6.0.0/data/sounds/alc/ShoppingCartBail.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/alc/ShoppingCartLand.snd": {
        "crc32": "201be7c1",
        "link": "/update/beta/0.6.0.0/data/sounds/alc/ShoppingCartLand.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/alc/ShoppingCartLoop.snd": {
        "crc32": "30c9b840",
        "link": "/update/beta/0.6.0.0/data/sounds/alc/ShoppingCartLoop.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/alc/ShoppingCartOllie.snd": {
        "crc32": "0a348ed4",
        "link": "/update/beta/0.6.0.0/data/sounds/alc/ShoppingCartOllie.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Cnv/AlligatorSteps.snd": {
        "crc32": "0f334e03",
        "link": "/update/beta/0.6.0.0/data/sounds/Cnv/AlligatorSteps.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Cnv/BanjoLoop.snd": {
        "crc32": "1a8389c3",
        "link": "/update/beta/0.6.0.0/data/sounds/Cnv/BanjoLoop.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Cnv/BanjoLoop2.snd": {
        "crc32": "b8f0ee3c",
        "link": "/update/beta/0.6.0.0/data/sounds/Cnv/BanjoLoop2.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Cnv/DragonRideLoop.snd": {
        "crc32": "f8c93306",
        "link": "/update/beta/0.6.0.0/data/sounds/Cnv/DragonRideLoop.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Cnv/ferriswheel.snd": {
        "crc32": "1b4f1085",
        "link": "/update/beta/0.6.0.0/data/sounds/Cnv/ferriswheel.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Cnv/gravitron_loop.snd": {
        "crc32": "f719c806",
        "link": "/update/beta/0.6.0.0/data/sounds/Cnv/gravitron_loop.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Cnv/gravitron_start.snd": {
        "crc32": "94d32b8e",
        "link": "/update/beta/0.6.0.0/data/sounds/Cnv/gravitron_start.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Cnv/gravitron_stop.snd": {
        "crc32": "9ddaf1b1",
        "link": "/update/beta/0.6.0.0/data/sounds/Cnv/gravitron_stop.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Cnv/RocketsRideLoop_11.snd": {
        "crc32": "7704db82",
        "link": "/update/beta/0.6.0.0/data/sounds/Cnv/RocketsRideLoop_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Cnv/rollercoaster1.snd": {
        "crc32": "a2360ce3",
        "link": "/update/beta/0.6.0.0/data/sounds/Cnv/rollercoaster1.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Cnv/rollercoaster2.snd": {
        "crc32": "2448f93e",
        "link": "/update/beta/0.6.0.0/data/sounds/Cnv/rollercoaster2.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Cnv/rollercoaster3.snd": {
        "crc32": "82089c40",
        "link": "/update/beta/0.6.0.0/data/sounds/Cnv/rollercoaster3.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Cnv/TeacupLoop.snd": {
        "crc32": "4d81aea2",
        "link": "/update/beta/0.6.0.0/data/sounds/Cnv/TeacupLoop.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/HI/HI_DrippingSewer01.snd": {
        "crc32": "0589f8c3",
        "link": "/update/beta/0.6.0.0/data/sounds/HI/HI_DrippingSewer01.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/HI/HI_ElevatorDing02.snd": {
        "crc32": "9f07eb8c",
        "link": "/update/beta/0.6.0.0/data/sounds/HI/HI_ElevatorDing02.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/HI/HI_HelicopterLoop.snd": {
        "crc32": "6afd00f6",
        "link": "/update/beta/0.6.0.0/data/sounds/HI/HI_HelicopterLoop.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/hof/ELTrainLoop.snd": {
        "crc32": "87a07d08",
        "link": "/update/beta/0.6.0.0/data/sounds/hof/ELTrainLoop.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Jnk/buoybellring.snd": {
        "crc32": "b58f4441",
        "link": "/update/beta/0.6.0.0/data/sounds/Jnk/buoybellring.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Jnk/buoymvmtloop.snd": {
        "crc32": "40f9c7c1",
        "link": "/update/beta/0.6.0.0/data/sounds/Jnk/buoymvmtloop.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Jnk/dieselgenerator.snd": {
        "crc32": "ebc9550c",
        "link": "/update/beta/0.6.0.0/data/sounds/Jnk/dieselgenerator.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Jnk/GeneratorWobble.snd": {
        "crc32": "ca92a059",
        "link": "/update/beta/0.6.0.0/data/sounds/Jnk/GeneratorWobble.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Jnk/helicopter15.snd": {
        "crc32": "dd3c1cc7",
        "link": "/update/beta/0.6.0.0/data/sounds/Jnk/helicopter15.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Jnk/magnethum2.snd": {
        "crc32": "18616be2",
        "link": "/update/beta/0.6.0.0/data/sounds/Jnk/magnethum2.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Jnk/SewagePipeLoop.snd": {
        "crc32": "fba5297d",
        "link": "/update/beta/0.6.0.0/data/sounds/Jnk/SewagePipeLoop.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Jnk/SmokeStackSteam.snd": {
        "crc32": "0026be23",
        "link": "/update/beta/0.6.0.0/data/sounds/Jnk/SmokeStackSteam.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Jnk/TrainLoop.snd": {
        "crc32": "171f0bca",
        "link": "/update/beta/0.6.0.0/data/sounds/Jnk/TrainLoop.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Jnk/TrainTrackSwitch.snd": {
        "crc32": "ca0e6d7c",
        "link": "/update/beta/0.6.0.0/data/sounds/Jnk/TrainTrackSwitch.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Lon/pigeonfly.snd": {
        "crc32": "0e90379f",
        "link": "/update/beta/0.6.0.0/data/sounds/Lon/pigeonfly.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Lon/UKPhone.snd": {
        "crc32": "dcc9213f",
        "link": "/update/beta/0.6.0.0/data/sounds/Lon/UKPhone.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Lon/WireSnap.snd": {
        "crc32": "25911f79",
        "link": "/update/beta/0.6.0.0/data/sounds/Lon/WireSnap.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/RU/RU_BellHit01.snd": {
        "crc32": "866f3b94",
        "link": "/update/beta/0.6.0.0/data/sounds/RU/RU_BellHit01.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/RU/RU_CameraBreak.snd": {
        "crc32": "64d55d9b",
        "link": "/update/beta/0.6.0.0/data/sounds/RU/RU_CameraBreak.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/RU/RU_CannonShot01.snd": {
        "crc32": "44eaf324",
        "link": "/update/beta/0.6.0.0/data/sounds/RU/RU_CannonShot01.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/RU/RU_TurretMvmt.snd": {
        "crc32": "b3f6b5a6",
        "link": "/update/beta/0.6.0.0/data/sounds/RU/RU_TurretMvmt.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/sc2/lamppostfall.snd": {
        "crc32": "515081ef",
        "link": "/update/beta/0.6.0.0/data/sounds/sc2/lamppostfall.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/sc2/metalcreaks.snd": {
        "crc32": "4ba56819",
        "link": "/update/beta/0.6.0.0/data/sounds/sc2/metalcreaks.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Bballbounce_11.snd": {
        "crc32": "08f860f1",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Bballbounce_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Bballbounce2_11.snd": {
        "crc32": "6c7f3cef",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Bballbounce2_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Bballbounce3_11.snd": {
        "crc32": "ed38a5d8",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Bballbounce3_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Bballhitbasket_11.snd": {
        "crc32": "218712c3",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Bballhitbasket_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Bballhitbasket2_11.snd": {
        "crc32": "5ba4bacb",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Bballhitbasket2_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Bballswish_11.snd": {
        "crc32": "7d49a9a2",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Bballswish_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Bballswish2_11.snd": {
        "crc32": "b5060db1",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Bballswish2_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Bballswish3_11.snd": {
        "crc32": "d8bc79a8",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Bballswish3_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Bballswish4_11.snd": {
        "crc32": "d26214b5",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Bballswish4_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/HitBasketball.snd": {
        "crc32": "2da1a9dd",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/HitBasketball.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Hitfootballhelmet_11.snd": {
        "crc32": "94a28e25",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Hitfootballhelmet_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/HitFootballHelmet2.snd": {
        "crc32": "cfde4a86",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/HitFootballHelmet2.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Sch_Security_Breathing_11.snd": {
        "crc32": "9570b7bc",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Sch_Security_Breathing_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Sch_Tennis_11.snd": {
        "crc32": "cf062be0",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Sch_Tennis_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/spark2_11.snd": {
        "crc32": "13cdbcf2",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/spark2_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/spark3_11.snd": {
        "crc32": "445d9173",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/spark3_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/spark4_11.snd": {
        "crc32": "05d33db0",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/spark4_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/spark5_11.snd": {
        "crc32": "c6a415e7",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/spark5_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Sparks_11.snd": {
        "crc32": "d0bccfb7",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Sparks_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Tennisballbounce_11.snd": {
        "crc32": "2ba90d8d",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Tennisballbounce_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Tennisballbounce2_11.snd": {
        "crc32": "b744f458",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Tennisballbounce2_11.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Tennisballhit.snd": {
        "crc32": "c55b519e",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Tennisballhit.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/Tennisballhit2.snd": {
        "crc32": "71031a1e",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/Tennisballhit2.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Sch/togatoga.snd": {
        "crc32": "cc335039",
        "link": "/update/beta/0.6.0.0/data/sounds/Sch/togatoga.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/SD/SD_ACHum01.snd": {
        "crc32": "db10b310",
        "link": "/update/beta/0.6.0.0/data/sounds/SD/SD_ACHum01.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/SD/SD_BellHit01.snd": {
        "crc32": "866f3b94",
        "link": "/update/beta/0.6.0.0/data/sounds/SD/SD_BellHit01.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/SD/SD_CartLoop.snd": {
        "crc32": "17de9e27",
        "link": "/update/beta/0.6.0.0/data/sounds/SD/SD_CartLoop.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/SD/SD_FlagFlap01.snd": {
        "crc32": "f4b54d1c",
        "link": "/update/beta/0.6.0.0/data/sounds/SD/SD_FlagFlap01.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/SD/SD_FountainLoop01.snd": {
        "crc32": "85e729f7",
        "link": "/update/beta/0.6.0.0/data/sounds/SD/SD_FountainLoop01.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/SD/SD_FountainLoop02.snd": {
        "crc32": "8564a9d3",
        "link": "/update/beta/0.6.0.0/data/sounds/SD/SD_FountainLoop02.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/SD/SD_FountainLoop03.snd": {
        "crc32": "036f8283",
        "link": "/update/beta/0.6.0.0/data/sounds/SD/SD_FountainLoop03.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/SD/SD_FountainLoop04.snd": {
        "crc32": "86c4e5d4",
        "link": "/update/beta/0.6.0.0/data/sounds/SD/SD_FountainLoop04.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/SD/SD_LightBreak01.snd": {
        "crc32": "35266dad",
        "link": "/update/beta/0.6.0.0/data/sounds/SD/SD_LightBreak01.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/SD/SD_LightBuzzLoop01.snd": {
        "crc32": "1d4f1be7",
        "link": "/update/beta/0.6.0.0/data/sounds/SD/SD_LightBuzzLoop01.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/SD/SD_LightTurnOn01.snd": {
        "crc32": "84889a46",
        "link": "/update/beta/0.6.0.0/data/sounds/SD/SD_LightTurnOn01.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/SD/SD_PotteryBreak02.snd": {
        "crc32": "3d0df418",
        "link": "/update/beta/0.6.0.0/data/sounds/SD/SD_PotteryBreak02.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/SD/SD_PumpRoom01.snd": {
        "crc32": "855f1785",
        "link": "/update/beta/0.6.0.0/data/sounds/SD/SD_PumpRoom01.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/sr/scissorlift_down.snd": {
        "crc32": "904c9fa9",
        "link": "/update/beta/0.6.0.15/data/sounds/sr/scissorlift_down.snd",
        "version": "0.6.0.15"
    },
    "data/sounds/sr/scissorlift_start.snd": {
        "crc32": "284bf4a9",
        "link": "/update/beta/0.6.0.15/data/sounds/sr/scissorlift_start.snd",
        "version": "0.6.0.15"
    },
    "data/sounds/terrains/ollieconc_thaw.snd": {
        "crc32": "1ddc3d07",
        "link": "/update/beta/0.6.0.15/data/sounds/terrains/ollieconc_thaw.snd",
        "version": "0.6.0.15"
    },
    "data/sounds/terrains/ollieconc19_thaw.snd": {
        "crc32": "ba252d86",
        "link": "/update/beta/0.6.0.15/data/sounds/terrains/ollieconc19_thaw.snd",
        "version": "0.6.0.15"
    },
    "data/sounds/terrains/revertconc_thaw.snd": {
        "crc32": "c83c30ec",
        "link": "/update/beta/0.6.0.15/data/sounds/terrains/revertconc_thaw.snd",
        "version": "0.6.0.15"
    },
    "data/sounds/thugpro/menu/ExtraTrick_THPS4.snd": {
        "crc32": "0f68c7d7",
        "link": "/update/beta/0.6.0.15/data/sounds/thugpro/menu/ExtraTrick_THPS4.snd",
        "version": "0.6.0.15"
    },
    "data/sounds/thugpro/ros_door.snd": {
        "crc32": "f7c9d0a2",
        "link": "/update/beta/0.6.0.0/data/sounds/thugpro/ros_door.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/z_el/chopper_loop.snd": {
        "crc32": "fe607a18",
        "link": "/update/beta/0.6.0.15/data/sounds/z_el/chopper_loop.snd",
        "version": "0.6.0.15"
    },
    "data/sounds/z_el/gutter_01.snd": {
        "crc32": "1150a3c4",
        "link": "/update/beta/0.6.0.15/data/sounds/z_el/gutter_01.snd",
        "version": "0.6.0.15"
    },
    "data/sounds/z_ms/FrenchPA01X.snd": {
        "crc32": "8caa0b06",
        "link": "/update/beta/0.6.0.0/data/sounds/z_ms/FrenchPA01X.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/z_sv2/generator_loop.snd": {
        "crc32": "64ddf88b",
        "link": "/update/beta/0.6.0.15/data/sounds/z_sv2/generator_loop.snd",
        "version": "0.6.0.15"
    },
    "data/sounds/z_sv2/truck_loop.snd": {
        "crc32": "6199881f",
        "link": "/update/beta/0.6.0.15/data/sounds/z_sv2/truck_loop.snd",
        "version": "0.6.0.15"
    },
    "data/sounds/Zoo/ElephantStampede.snd": {
        "crc32": "7f52adfd",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/ElephantStampede.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Giraffe_rd.snd": {
        "crc32": "9e4ffdd6",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Giraffe_rd.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Hippo1.snd": {
        "crc32": "aca31a98",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Hippo1.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Hippo2.snd": {
        "crc32": "87764b26",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Hippo2.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Hippoplant.snd": {
        "crc32": "88f7f32c",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Hippoplant.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/HitElephant.snd": {
        "crc32": "08c90365",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/HitElephant.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/HitGiraffe.snd": {
        "crc32": "3c7b1d8c",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/HitGiraffe.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/HitGiraffe2.snd": {
        "crc32": "c2ebcf0a",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/HitGiraffe2.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/HitHippo.snd": {
        "crc32": "a5010ad4",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/HitHippo.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/HitLion.snd": {
        "crc32": "11e376b1",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/HitLion.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/HitPenguin.snd": {
        "crc32": "c3950e32",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/HitPenguin.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/HitRhino.snd": {
        "crc32": "999e84de",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/HitRhino.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/HitSealion.snd": {
        "crc32": "d2d9a07c",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/HitSealion.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/lion1.snd": {
        "crc32": "4062cc9a",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/lion1.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/lion2.snd": {
        "crc32": "53cb0345",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/lion2.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/lion3.snd": {
        "crc32": "1084bebf",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/lion3.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/ManyBirdChirps_rd.snd": {
        "crc32": "6db92c09",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/ManyBirdChirps_rd.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Meerkat1.snd": {
        "crc32": "d3dc1db6",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Meerkat1.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Meerkat2.snd": {
        "crc32": "519e9c3e",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Meerkat2.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Monkey_rd.snd": {
        "crc32": "2f664583",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Monkey_rd.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Monkey2_rd.snd": {
        "crc32": "9d687464",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Monkey2_rd.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Monkeypoo_laugh.snd": {
        "crc32": "ab032b6f",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Monkeypoo_laugh.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Monkeypoo_splat1.snd": {
        "crc32": "86c91e8f",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Monkeypoo_splat1.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Monkeypoo_splat2.snd": {
        "crc32": "366e43f0",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Monkeypoo_splat2.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Monkeypoo.snd": {
        "crc32": "c156b276",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Monkeypoo.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Penguingroup1_rd.snd": {
        "crc32": "2087e344",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Penguingroup1_rd.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Penguingroup1.snd": {
        "crc32": "929ebf89",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Penguingroup1.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Rhino.snd": {
        "crc32": "2b1dae00",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Rhino.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/sharkattack.snd": {
        "crc32": "9f58fe92",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/sharkattack.snd",
        "version": "0.6.0.0"
    },
    "data/sounds/Zoo/Stompy_Footsteps.snd": {
        "crc32": "995aea4f",
        "link": "/update/beta/0.6.0.0/data/sounds/Zoo/Stompy_Footsteps.snd",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/truck_blue.img.xbx": {
        "crc32": "3e1052fb",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/truck_blue.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/truck_core_black_red.img.xbx": {
        "crc32": "97cd64b4",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/truck_core_black_red.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/truck_default.img.xbx": {
        "crc32": "22fb309b",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/truck_default.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/truck_green.img.xbx": {
        "crc32": "717796ba",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/truck_green.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/truck_independent_black_black.img.xbx": {
        "crc32": "b99d8405",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/truck_independent_black_black.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/truck_independent_grey_yellow.img.xbx": {
        "crc32": "7618a1b9",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/truck_independent_grey_yellow.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/truck_orange.img.xbx": {
        "crc32": "096bc3de",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/truck_orange.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/truck_purple.img.xbx": {
        "crc32": "b50f5377",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/truck_purple.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/truck_red.img.xbx": {
        "crc32": "7957ffc6",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/truck_red.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/truck_tensor_green_black.img.xbx": {
        "crc32": "2f9150ba",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/truck_tensor_green_black.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/truck_tensor_grey_black.img.xbx": {
        "crc32": "178837ba",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/truck_tensor_grey_black.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/truck_tensor_grey_grey.img.xbx": {
        "crc32": "562ca2a0",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/truck_tensor_grey_grey.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/truck_thunder_black_green.img.xbx": {
        "crc32": "c753d7a4",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/truck_thunder_black_green.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/truck_thunder_grey_black.img.xbx": {
        "crc32": "04f35e5f",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/truck_thunder_grey_black.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_autobahn_torus_ar.img.xbx": {
        "crc32": "daf7a66c",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_autobahn_torus_ar.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_baker.img.xbx": {
        "crc32": "688bf6b7",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_baker.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_black.img.xbx": {
        "crc32": "a7140fb0",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_black.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_bones_100.img.xbx": {
        "crc32": "ccfbfa04",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_bones_100.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_bones_mylittlebartie.img.xbx": {
        "crc32": "a63064d6",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_bones_mylittlebartie.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_concrete_conspiracy_99.img.xbx": {
        "crc32": "92ae1438",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_concrete_conspiracy_99.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_crashtest.img.xbx": {
        "crc32": "de739142",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_crashtest.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_creature_bloodsuckers.img.xbx": {
        "crc32": "cac009ef",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_creature_bloodsuckers.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_cyber.img.xbx": {
        "crc32": "a1f07456",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_cyber.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_doughnut.img.xbx": {
        "crc32": "65f2054b",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_doughnut.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_earthwing_superballs.img.xbx": {
        "crc32": "1e7489ff",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_earthwing_superballs.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_element_section_allterrain.img.xbx": {
        "crc32": "f78ad937",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_element_section_allterrain.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_enjoi_cairo_slix_red.img.xbx": {
        "crc32": "afdbc259",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_enjoi_cairo_slix_red.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_enjoi_cairo_slix.img.xbx": {
        "crc32": "8bd23eb6",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_enjoi_cairo_slix.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_gold_williams_hope.img.xbx": {
        "crc32": "45648b75",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_gold_williams_hope.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_heartagram_black.img.xbx": {
        "crc32": "6bb36458",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_heartagram_black.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_heartagram_white.img.xbx": {
        "crc32": "20de47ce",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_heartagram_white.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_hypnotic.img.xbx": {
        "crc32": "9bd85a49",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_hypnotic.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_ojiii_ditch_witch.img.xbx": {
        "crc32": "2647edda",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_ojiii_ditch_witch.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_pig_headswirls_black.img.xbx": {
        "crc32": "a6596bcf",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_pig_headswirls_black.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_pig_headswirls.img.xbx": {
        "crc32": "f57e0873",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_pig_headswirls.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_portlandwheelco_tweesters.img.xbx": {
        "crc32": "bb3a973d",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_portlandwheelco_tweesters.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_santacruz_slimeball_bigballs.img.xbx": {
        "crc32": "5afccf1f",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_santacruz_slimeball_bigballs.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_skiddles.img.xbx": {
        "crc32": "b7dc1a70",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_skiddles.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_spitfire_bighead_blue.img.xbx": {
        "crc32": "a37ced85",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_spitfire_bighead_blue.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_spitfire_bighead_green.img.xbx": {
        "crc32": "5667edf6",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_spitfire_bighead_green.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_spitfire_bighead.img.xbx": {
        "crc32": "4c8a4180",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_spitfire_bighead.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_spitfire_classic_02.img.xbx": {
        "crc32": "92fa4f24",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_spitfire_classic_02.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_spitfire_classic_neon.img.xbx": {
        "crc32": "e5fdce26",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_spitfire_classic_neon.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_spitfire_classic.img.xbx": {
        "crc32": "cfe6cfb3",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_spitfire_classic.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_spitfire_f4.img.xbx": {
        "crc32": "6f51ae5c",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_spitfire_f4.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_spitfire_hawaiian.img.xbx": {
        "crc32": "f992d013",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_spitfire_hawaiian.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_spitfire_hypnoswirl.img.xbx": {
        "crc32": "0b949d82",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_spitfire_hypnoswirl.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_spitfire_tripper.img.xbx": {
        "crc32": "1f4c9b34",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_spitfire_tripper.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_spitfire_what_me_burn.img.xbx": {
        "crc32": "8f07ff15",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_spitfire_what_me_burn.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_spitfire.img.xbx": {
        "crc32": "cc0045f0",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_spitfire.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_thug.img.xbx": {
        "crc32": "b6d90079",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_thug.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_white.img.xbx": {
        "crc32": "f5c1fdb3",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_white.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/board_textures/wheel_yellow.img.xbx": {
        "crc32": "3e9a1620",
        "link": "/update/beta/0.6.0.0/data/textures/board_textures/wheel_yellow.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/Baker_Braydon.img.xbx": {
        "crc32": "514653a4",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/Baker_Braydon.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/Baker_ToxicCloud.img.xbx": {
        "crc32": "dc44f109",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/Baker_ToxicCloud.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/bh_hawk_green.img.xbx": {
        "crc32": "5c95f923",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/bh_hawk_green.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/bh_hawk_mcsqueeb01.img.xbx": {
        "crc32": "14711780",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/bh_hawk_mcsqueeb01.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/bh_hawk_mcsqueeb02.img.xbx": {
        "crc32": "3be94ea7",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/bh_hawk_mcsqueeb02.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/bh_hawk_nfi.img.xbx": {
        "crc32": "1d4bb801",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/bh_hawk_nfi.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/bh_team_01.img.xbx": {
        "crc32": "51b1211f",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/bh_team_01.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_al_lewis.img.xbx": {
        "crc32": "7af3dd49",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_al_lewis.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_barbq.img.xbx": {
        "crc32": "148071ec",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_barbq.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_bh_jaws.img.xbx": {
        "crc32": "b7e0dfe4",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_bh_jaws.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_birdhouse_man.img.xbx": {
        "crc32": "1fd5effa",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_birdhouse_man.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_bk_figgy.img.xbx": {
        "crc32": "36fbf557",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_bk_figgy.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_blanbredblue.img.xbx": {
        "crc32": "3401aafb",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_blanbredblue.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_blvd.img.xbx": {
        "crc32": "cd0b49d7",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_blvd.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_bunny.img.xbx": {
        "crc32": "2155329b",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_bunny.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_cats.img.xbx": {
        "crc32": "5a1adece",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_cats.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_colohairgal.img.xbx": {
        "crc32": "37814ee8",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_colohairgal.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_el_wwfe.img.xbx": {
        "crc32": "0e382a69",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_el_wwfe.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_enj_wood.img.xbx": {
        "crc32": "7887f84a",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_enj_wood.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_enjoi_panda.img.xbx": {
        "crc32": "17b933a0",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_enjoi_panda.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_flo.img.xbx": {
        "crc32": "ee7439d9",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_flo.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_fur.img.xbx": {
        "crc32": "3fdd6834",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_fur.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_girl_erick01.img.xbx": {
        "crc32": "034e6581",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_girl_erick01.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_girl_erick02.img.xbx": {
        "crc32": "b55694dc",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_girl_erick02.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_gurl.img.xbx": {
        "crc32": "59459ba4",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_gurl.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_ho_bsch.img.xbx": {
        "crc32": "694f7262",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_ho_bsch.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_hoopla.img.xbx": {
        "crc32": "f12dd822",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_hoopla.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_jofswc.img.xbx": {
        "crc32": "41a3fcb6",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_jofswc.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_kfd_zomb01.img.xbx": {
        "crc32": "412e2e9a",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_kfd_zomb01.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_kfd_zomb02.img.xbx": {
        "crc32": "ad5b89ce",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_kfd_zomb02.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_kfd_zomb03.img.xbx": {
        "crc32": "eb2e070c",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_kfd_zomb03.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_pb_skull01.img.xbx": {
        "crc32": "bacff8b4",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_pb_skull01.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_pb_skull02.img.xbx": {
        "crc32": "c7f4324e",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_pb_skull02.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_planb_none.img.xbx": {
        "crc32": "e3bae46d",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_planb_none.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_rm_hover.img.xbx": {
        "crc32": "443ad2a3",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_rm_hover.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_rollin.img.xbx": {
        "crc32": "1e5b7c55",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_rollin.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_sup_royal.img.xbx": {
        "crc32": "24119e61",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_sup_royal.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_th4_eyefam.img.xbx": {
        "crc32": "22791626",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_th4_eyefam.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_thugpro.img.xbx": {
        "crc32": "dc636588",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_thugpro.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_tiger.img.xbx": {
        "crc32": "ebf021d4",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_tiger.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_uber.img.xbx": {
        "crc32": "28927b9a",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_uber.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/board_zebra.img.xbx": {
        "crc32": "ca981017",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/board_zebra.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/Element_MeltedBlue.img.xbx": {
        "crc32": "f8df5e32",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/Element_MeltedBlue.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/Enjoi_TiedyePanda.img.xbx": {
        "crc32": "b1fbe81d",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/Enjoi_TiedyePanda.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/grip_generic04.img.xbx": {
        "crc32": "df8e8600",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/grip_generic04.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/tape_actualhd.img.xbx": {
        "crc32": "ad70e5fe",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/tape_actualhd.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/tape_hd.img.xbx": {
        "crc32": "33233207",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/tape_hd.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/custom_boards/zero_green.img.xbx": {
        "crc32": "1dd3251c",
        "link": "/update/beta/0.6.0.0/data/textures/custom_boards/zero_green.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/__banner_closed.img.xbx": {
        "crc32": "ea8631bd",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/__banner_closed.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/__banner_signup.img.xbx": {
        "crc32": "4ccfda5a",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/__banner_signup.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/__billboard_closed.img.xbx": {
        "crc32": "d2beca92",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/__billboard_closed.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/__billboard_signup.img.xbx": {
        "crc32": "b5b5b7c9",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/__billboard_signup.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/__poster_closed.img.xbx": {
        "crc32": "b3b75209",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/__poster_closed.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/__poster_signup.img.xbx": {
        "crc32": "800e0ca8",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/__poster_signup.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/banner00.img.xbx": {
        "crc32": "e79dab00",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/banner00.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/banner01.img.xbx": {
        "crc32": "e79dab00",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/banner01.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/banner02.img.xbx": {
        "crc32": "e79dab00",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/banner02.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/banner03.img.xbx": {
        "crc32": "e79dab00",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/banner03.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/billboard00.img.xbx": {
        "crc32": "2928b07d",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/billboard00.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/billboard01.img.xbx": {
        "crc32": "fd9765b8",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/billboard01.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/billboard02.img.xbx": {
        "crc32": "e79dab00",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/billboard02.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/billboard03.img.xbx": {
        "crc32": "e79dab00",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/billboard03.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/billboard04.img.xbx": {
        "crc32": "e79dab00",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/billboard04.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/billboard05.img.xbx": {
        "crc32": "e79dab00",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/billboard05.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/DEFAULT.img.xbx": {
        "crc32": "e79dab00",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/DEFAULT.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/ns_blackwhite.img.xbx": {
        "crc32": "59047425",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/ns_blackwhite.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/ns_devil.img.xbx": {
        "crc32": "6df51686",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/ns_devil.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/poster00.img.xbx": {
        "crc32": "2d5628d9",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/poster00.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/poster01.img.xbx": {
        "crc32": "d523475e",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/poster01.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/poster02.img.xbx": {
        "crc32": "fd47f1c0",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/poster02.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/poster03.img.xbx": {
        "crc32": "6d6eeabd",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/poster03.img.xbx",
        "version": "0.6.0.0"
    },
    "data/textures/thugpro/poster04.img.xbx": {
        "crc32": "11ad5af8",
        "link": "/update/beta/0.6.0.0/data/textures/thugpro/poster04.img.xbx",
        "version": "0.6.0.0"
    }
}

var fileQueue = []
/*
    {
        "link": "https://dl.thugpro.com" + PATH ON SERVER,
        "location": PATH ON DISK
    }
*/

for (file in fileList) {
    //console.log("Checking file: " + file);
    var filepath = path.join(folderpath, file);
    //console.log("Path: " + filepath);
    if (fs.existsSync(filepath)) {
        // File exists, check hash

        // Read the file, get the CRC32 hash of it (signed int)
        var filedata = crc32.buf(fs.readFileSync(filepath));
        
        // parse 2s complement if negative
        if (filedata < 0) {
            filedata = filedata >>> 0;
        }

        // Convert to a hex string and pad if necessary
        filedata = filedata.toString(16);
        while (filedata.length < 8) filedata = "0" + filedata;
        
        if (filedata == fileList[file].crc32) {
            //console.log("Hash matches! skipping");
        } else {
            console.log(filepath + " ||| Hash does not match! (" + filedata + "/" + fileList[file].crc32 + ")");
            fileQueue.push({
                "link": "https://dl.thugpro.com" + fileList[file].link,
                "location": filepath
            });
        }
    } else {
        // Add to download list
        console.log(filepath + " ||| File not found!");
        fileQueue.push({
            "link": "https://dl.thugpro.com" + fileList[file].link,
            "location": filepath
        });
    }
}

console.log("Finished checking files, current download list:\n" + JSON.stringify(fileQueue));

processQueue();

// Queue files to download so we don't try to download all at once
function processQueue() {
    if  (fileQueue.length == 0) {
        console.log("Finished updating");
        return;
    }
    var curFile = fileQueue.pop();
    console.log("Downloading file:" + JSON.stringify(curFile));
    var writeStream = fs.createWriteStream(curFile.location);
    var req = https.get(curFile.link, function (response) {
        console.log("...");
        response.pipe(writeStream);
        response.on("close", function () {
            if (response.complete) {
                console.log("Completed");
            }
            processQueue();            
        })
    });
    req.on("error", function (err) {
        console.log("Failed to download\n" + err);
        processQueue();
    });
}