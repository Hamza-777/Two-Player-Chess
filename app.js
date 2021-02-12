const chess = document.querySelector('.chessboard');
chess.addEventListener('click', movePiece);

const a1 = document.getElementById('a1');
const b1 = document.getElementById('b1');
const c1 = document.getElementById('c1');
const d1 = document.getElementById('d1');
const f1 = document.getElementById('f1');
const g1 = document.getElementById('g1');
const h1 = document.getElementById('h1');
const a8 = document.getElementById('a8');
const b8 = document.getElementById('b8');
const c8 = document.getElementById('c8');
const d8 = document.getElementById('d8');
const f8 = document.getElementById('f8');
const g8 = document.getElementById('g8');
const h8 = document.getElementById('h8');

let img = '';
let move_count = 0;
let parentID = '';
let parent = '';
let wking_move_count = 0;
let bking_move_count = 0;
let qsidewrook_move_count = 0;
let ksidewrook_move_count = 0;
let qsidebrook_move_count = 0;
let ksidebrook_move_count = 0;

// Boxes where a king can jump to
const nearby = {
    'a': 'abb',
    'b': 'abc',
    'c': 'bcd',
    'd': 'cde',
    'e': 'def',
    'f': 'efg',
    'g': 'fgh',
    'h': 'ggh'
};

// Boxes where a pawn can capture
const pNearby = {
    'a': 'bb',
    'b': 'ac',
    'c': 'bd',
    'd': 'ce',
    'e': 'df',
    'f': 'eg',
    'g': 'fh',
    'h': 'gg'
};

// Boxes where knight can jump
const kNearby = {
    'a': 'bcbc',
    'b': 'adcd',
    'c': 'bade',
    'd': 'cbef',
    'e': 'dcfg',
    'f': 'edgh',
    'g': 'fehe',
    'h': 'gfgf'
};

// Boxes where a bishop can jump
const bNearby = {
    'a': 'bcdefgh',
    'b': 'acdefgh',
    'c': 'abdefgh',
    'd': 'abcefgh',
    'e': 'abcdfgh',
    'f': 'abcdegh',
    'g': 'abcdefh',
    'h': 'abcdefg'
};

// Chessboard notations respective to the board
const board = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
];

function movePiece(e) {
    // Exchange pieces
    if ((e.target.classList.contains('img') && img != '')) {
        if ((e.target.classList.contains('bp') && img.classList.contains('wp')) || (e.target.classList.contains('wp') && img.classList.contains('bp'))) {
            if (img.classList.contains('lbishop') || img.classList.contains('dbishop')) {
                if (bishop(img, e.target.parentElement)) {
                    e.target.src = img.src;
                    e.target.classList = img.classList;
                    img = '';
                    move_count += 1;
                    // rotate();
                }
            } else if (img.classList.contains('rook')) {
                if (rook(img, e.target.parentElement)) {
                    e.target.src = img.src;
                    e.target.classList = img.classList;
                    e.target.id = img.id;
                    img = '';
                    move_count += 1;
                    if (e.target.id == 'qswr') {
                        qsidewrook_move_count = 1;
                    } else if (e.target.id == 'kswr') {
                        ksidewrook_move_count = 1;
                    } else if (e.target.id == 'qsbr') {
                        qsidebrook_move_count = 1;
                    } else if (e.target.id == 'ksbr') {
                        ksidebrook_move_count = 1;
                    }
                    // rotate();
                }
            } else if (img.classList.contains('queen')) {
                if (queen(img, e.target.parentElement)) {
                    e.target.src = img.src;
                    e.target.classList = img.classList;
                    img = '';
                    move_count += 1;
                    // rotate();
                }
            } else if (img.classList.contains('king')) {
                if (king(img, e.target.parentElement)) {
                    e.target.src = img.src;
                    e.target.classList = img.classList;
                    if (img.classList.contains('wp')) {
                        wking_move_count += 1;
                    } else {
                        bking_move_count += 1;
                    }
                    img = '';
                    move_count += 1;
                    // rotate();
                }
            } else if (img.classList.contains('pawn')) {
                if (pawn(img, e.target.parentElement)) {
                    e.target.src = img.src;
                    e.target.classList = img.classList;
                    img = '';
                    move_count += 1;
                    // rotate();
                }
            } else if (img.classList.contains('knight')) {
                if (knight(img, e.target.parentElement)) {
                    e.target.src = img.src;
                    e.target.classList = img.classList;
                    img = '';
                    move_count += 1;
                    // rotate();
                }
            }
        }
    }
    // Select a piece
    else if (e.target.classList.contains('img')) {
        if ((move_count % 2 == 0) && e.target.classList.contains('wp')) {
            img = e.target;
            parentID = e.target.parentElement.id;
            parent = e.target.parentElement;
            e.target.parentElement.innerHTML = '';
        } else if ((move_count % 2 != 0) && e.target.classList.contains('bp')) {
            img = e.target;
            parentID = e.target.parentElement.id;
            parent = e.target.parentElement;
            e.target.parentElement.innerHTML = '';
        }
        // console.log(e.target.src);
    }
    // if no piece is selected
    else if (e.target.classList.contains('box') && img == '') {
        img = '';
        // console.log(e.target.lastElementChild);
    }
    // where the piece is to be moved
    else if (e.target.classList.contains('box')) {
        if (e.target.id != parentID) {
            if (img.classList.contains('lbishop') || img.classList.contains('dbishop')) {
                if (bishop(img, e.target)) {
                    e.target.appendChild(img);
                    img = '';
                    move_count += 1;
                    // rotate();
                }
            } else if (img.classList.contains('rook')) {
                if (rook(img, e.target)) {
                    e.target.appendChild(img);
                    if (img.classList.contains('wp') && img.parentElement.id == 'a1') {
                        qsidewrook_move_count = 1;
                    } else if (img.classList.contains('wp') && img.parentElement.id == 'h1') {
                        ksidewrook_move_count = 1;
                    } else if (img.classList.contains('bp') && img.parentElement.id == 'a8') {
                        qsidebrook_move_count = 1;
                    } else if (img.classList.contains('bp') && img.parentElement.id == 'h8') {
                        ksidebrook_move_count = 1;
                    }
                    img = '';
                    move_count += 1;
                    // rotate();
                }
            } else if (img.classList.contains('queen')) {
                if (queen(img, e.target)) {
                    e.target.appendChild(img);
                    img = '';
                    move_count += 1;
                    // rotate();
                }
            } else if (img.classList.contains('king')) {
                if (king(img, e.target)) {
                    e.target.appendChild(img);
                    if (img.classList.contains('wp')) {
                        wking_move_count += 1;
                    } else {
                        bking_move_count += 1;
                    }
                    img = '';
                    move_count += 1;
                    // rotate();
                } else if (img.classList.contains('wp') && (e.target.id == 'c1') && (d1.lastElementChild == null) && (c1.lastElementChild == null) && (b1.lastElementChild == null) && (wking_move_count == 0) && qsidewrook_move_count == 0) {
                    e.target.appendChild(img);
                    wking_move_count += 1;
                    qsidewrook_move_count = 1;
                    d1.appendChild(a1.lastElementChild);
                    a1.innerHTML = '';
                    img = '';
                    move_count += 1;
                    // rotate();
                } else if (img.classList.contains('wp') && (e.target.id == 'g1') && (f1.lastElementChild == null) && (g1.lastElementChild == null) && (wking_move_count == 0) && ksidewrook_move_count == 0) {
                    e.target.appendChild(img);
                    wking_move_count += 1;
                    ksidewrook_move_count = 1;
                    f1.appendChild(h1.lastElementChild);
                    h1.innerHTML = '';
                    img = '';
                    move_count += 1;
                    // rotate();
                } else if (img.classList.contains('bp') && (e.target.id == 'g8') && (f8.lastElementChild == null) && (g8.lastElementChild == null) && (bking_move_count == 0) && ksidebrook_move_count == 0) {
                    e.target.appendChild(img);
                    bking_move_count += 1;
                    ksidebrook_move_count = 1;
                    f8.appendChild(h8.lastElementChild);
                    h8.innerHTML = '';
                    img = '';
                    move_count += 1;
                    // rotate();
                } else if (img.classList.contains('bp') && (e.target.id == 'c8') && (d8.lastElementChild == null) && (c8.lastElementChild == null) && (b8.lastElementChild == null) && (bking_move_count == 0) && qsidebrook_move_count == 0) {
                    e.target.appendChild(img);
                    bking_move_count += 1;
                    qsidebrook_move_count = 1;
                    d8.appendChild(a8.lastElementChild);
                    a8.innerHTML = '';
                    img = '';
                    move_count += 1;
                    // rotate();
                }
            } else if (img.classList.contains('pawn')) {
                if (pawn(img, e.target)) {
                    e.target.appendChild(img);
                    img = '';
                    move_count += 1;
                    // rotate();
                }
            } else if (img.classList.contains('knight')) {
                if (knight(img, e.target)) {
                    e.target.appendChild(img);
                    img = '';
                    move_count += 1;
                    // rotate();
                }
            }
        } else {
            e.target.appendChild(img);
            img = '';
        }

        // console.log(e.target.id);
    }

    e.preventDefault();
}

// Decides if pawn can go to a selected box
function pawn(img, location) {
    let newID = location.id;
    let prevnum = parseInt(parentID[1]);
    let nextnum = parseInt(newID[1]);
    if (img.classList.contains('wp') && (location.lastElementChild != null) && (nextnum == prevnum + 1) && ((newID[0] == pNearby[parentID[0]][0]) || (newID[0] == pNearby[parentID[0]][1]))) {
        return true;
    } else if (img.classList.contains('bp') && (location.lastElementChild != null) && (nextnum == prevnum - 1) && ((newID[0] == pNearby[parentID[0]][0]) || (newID[0] == pNearby[parentID[0]][1]))) {
        return true;
    } else if (img.classList.contains('wp') && ((nextnum == prevnum + 1) || (nextnum == prevnum + 2)) && (parentID[0] == newID[0]) && parentID[1] == 2) {
        if (location.lastElementChild != null) {
            return false;
        } else if (document.getElementById(`${parentID[0]}3`).lastElementChild != null) {
            return false;
        } else {
            return true;
        }
    } else if (img.classList.contains('wp') && (nextnum == prevnum + 1) && (parentID[0] == newID[0])) {
        if (location.lastElementChild != null) {
            return false;
        } else {
            return true;
        }
    } else if (img.classList.contains('bp') && ((nextnum == prevnum - 1) || (nextnum == prevnum - 2)) && (parentID[0] == newID[0]) && parentID[1] == 7) {
        if (location.lastElementChild != null) {
            return false;
        } else if (document.getElementById(`${parentID[0]}6`).lastElementChild != null) {
            return false;
        } else {
            return true;
        }
    } else if (img.classList.contains('bp') && (nextnum == prevnum - 1) && (parentID[0] == newID[0])) {
        if (location.lastElementChild != null) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

// Decides if bishop can go to a selected box
function bishop(img, location) {
    let newID = location.id;
    let prevnum = parseInt(parentID[1]);
    let nextnum = parseInt(newID[1]);
    if (img.classList.contains('lbishop') && location.classList.contains('white')) {
        if (parentID[0] == 'a') {
            if (((newID[0] == 'b') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'c') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'd') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'e') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'f') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'g') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6))) || ((newID[0] == 'h') && ((nextnum = prevnum + 7) || (nextnum = prevnum - 7)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'b') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'c') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'd') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'e') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'f') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'g') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'h') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'c') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'b') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'd') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'e') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'f') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'g') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'h') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'd') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'b') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'c') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'e') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'f') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'g') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'h') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'e') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'b') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'c') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'd') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'f') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'g') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'h') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'f') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'b') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'c') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'd') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'e') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'g') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'h') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'g') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6))) || ((newID[0] == 'b') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'c') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'd') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'e') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'f') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'h') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'h') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 7) || (nextnum = prevnum - 7))) || ((newID[0] == 'b') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6))) || ((newID[0] == 'c') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'd') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'e') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'f') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'g') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    } else if (img.classList.contains('dbishop') && location.classList.contains('black')) {
        if (parentID[0] == 'a') {
            if (((newID[0] == 'b') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'c') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'd') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'e') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'f') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'g') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6))) || ((newID[0] == 'h') && ((nextnum = prevnum + 7) || (nextnum = prevnum - 7)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'b') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'c') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'd') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'e') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'f') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'g') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'h') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'c') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'b') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'd') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'e') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'f') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'g') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'h') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'd') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'b') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'c') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'e') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'f') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'g') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'h') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'e') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'b') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'c') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'd') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'f') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'g') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'h') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'f') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'b') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'c') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'd') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'e') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'g') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'h') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'g') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6))) || ((newID[0] == 'b') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'c') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'd') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'e') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'f') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'h') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'h') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 7) || (nextnum = prevnum - 7))) || ((newID[0] == 'b') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6))) || ((newID[0] == 'c') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'd') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'e') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'f') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'g') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}

// Decides if rook can go to a selected box
function rook(img, location) {
    let newID = location.id;
    let prevnum = parseInt(parentID[1]);
    let nextnum = parseInt(newID[1]);
    if ((parentID[0] == newID[0]) || (parentID[1] == newID[1])) {
        if (elementInBet(parentID, newID)) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

// Decides if queen can go to a selected box
function queen(img, location) {
    let newID = location.id;
    let prevnum = parseInt(parentID[1]);
    let nextnum = parseInt(newID[1]);
    if ((parentID[0] == newID[0]) || (parentID[1] == newID[1])) {
        if (elementInBet(parentID, newID)) {
            return false;
        } else {
            return true;
        }
    } else if (parent.classList.contains('white') && location.classList.contains('white')) {
        if (parentID[0] == 'a') {
            if (((newID[0] == 'b') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'c') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'd') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'e') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'f') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'g') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6))) || ((newID[0] == 'h') && ((nextnum = prevnum + 7) || (nextnum = prevnum - 7)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'b') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'c') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'd') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'e') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'f') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'g') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'h') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'c') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'b') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'd') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'e') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'f') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'g') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'h') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'd') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'b') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'c') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'e') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'f') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'g') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'h') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'e') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'b') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'c') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'd') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'f') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'g') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'h') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'f') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'b') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'c') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'd') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'e') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'g') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'h') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'g') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6))) || ((newID[0] == 'b') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'c') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'd') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'e') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'f') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'h') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'h') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 7) || (nextnum = prevnum - 7))) || ((newID[0] == 'b') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6))) || ((newID[0] == 'c') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'd') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'e') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'f') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'g') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    } else if (parent.classList.contains('black') && location.classList.contains('black')) {
        if (parentID[0] == 'a') {
            if (((newID[0] == 'b') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'c') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'd') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'e') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'f') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'g') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6))) || ((newID[0] == 'h') && ((nextnum = prevnum + 7) || (nextnum = prevnum - 7)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'b') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'c') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'd') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'e') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'f') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'g') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'h') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'c') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'b') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'd') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'e') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'f') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'g') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'h') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'd') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'b') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'c') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'e') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'f') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'g') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'h') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'e') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'b') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'c') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'd') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'f') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'g') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'h') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'f') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'b') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'c') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'd') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'e') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'g') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'h') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'g') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6))) || ((newID[0] == 'b') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'c') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'd') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'e') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'f') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1))) || ((newID[0] == 'h') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else if (parentID[0] == 'h') {
            if (((newID[0] == 'a') && ((nextnum = prevnum + 7) || (nextnum = prevnum - 7))) || ((newID[0] == 'b') && ((nextnum = prevnum + 6) || (nextnum = prevnum - 6))) || ((newID[0] == 'c') && ((nextnum = prevnum + 5) || (nextnum = prevnum - 5))) || ((newID[0] == 'd') && ((nextnum = prevnum + 4) || (nextnum = prevnum - 4))) || ((newID[0] == 'e') && ((nextnum = prevnum + 3) || (nextnum = prevnum - 3))) || ((newID[0] == 'f') && ((nextnum = prevnum + 2) || (nextnum = prevnum - 2))) || ((newID[0] == 'g') && ((nextnum = prevnum + 1) || (nextnum = prevnum - 1)))) {
                if (elementInMid(parentID, newID)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}

// Decides if king can go to a selected box
function king(img, location) {
    let newID = location.id;
    let prevnum = parseInt(parentID[1]);
    let nextnum = parseInt(newID[1]);
    if (((newID[0] == nearby[parentID[0]][0]) || (newID[0] == nearby[parentID[0]][1]) || (newID[0] == nearby[parentID[0]][2])) && ((nextnum == prevnum + 1) || (nextnum == prevnum - 1) || (nextnum == prevnum))) {
        return true;
    } else {
        return false;
    }
}

// Decides if knight can go to a selected box
function knight(img, location) {
    let newID = location.id;
    let prevnum = parseInt(parentID[1]);
    let nextnum = parseInt(newID[1]);
    if (((newID[0] == kNearby[parentID[0]][0]) || (newID[0] == kNearby[parentID[0]][2])) && ((nextnum == prevnum - 2) || (nextnum == prevnum + 2))) {
        return true;
    } else if (((newID[0] == kNearby[parentID[0]][1]) || (newID[0] == kNearby[parentID[0]][3])) && ((nextnum == prevnum - 1) || (nextnum == prevnum + 1))) {
        return true;
    } else {
        return false;
    }
}

// Rook ans Queen won't move if a piece in blocks it
function elementInBet(prev, next) {
    let chars = 'abcdefgh';
    let sn = parseInt(prev[1]);
    let en = parseInt(next[1]);
    let sc = chars.indexOf(prev[0]);
    let ec = chars.indexOf(next[0]);
    let ans = false;
    if (prev[0] != next[0]) {
        if (Math.abs(sc - ec) == 1) {
            return ans;
        } else {
            if (sc > ec) {
                for (let i = ec + 1; i < sc; i++) {
                    if (document.getElementById(`${chars[i]}${prev[1]}`).lastElementChild != null) {
                        ans = true;
                        break;
                    } else {
                        ans = false;
                    }
                }
                return ans;
            } else {
                for (let i = sc + 1; i < ec; i++) {
                    if (document.getElementById(`${chars[i]}${prev[1]}`).lastElementChild != null) {
                        ans = true;
                        break;
                    } else {
                        ans = false;
                    }
                }
                return ans;
            }
        }
    } else {
        if (Math.abs(sn - en) == 1) {
            return ans;
        } else {
            if (sn > en) {
                for (let i = en + 1; i < sn; i++) {
                    if (document.getElementById(`${prev[0]}${i}`).lastElementChild != null) {
                        ans = true;
                        break;
                    } else {
                        ans = false;
                    }
                }
                return ans;
            } else {
                for (let i = sn + 1; i < en; i++) {
                    if (document.getElementById(`${prev[0]}${i}`).lastElementChild != null) {
                        ans = true;
                        break;
                    } else {
                        ans = false;
                    }
                }
                return ans;
            }
        }
    }
}

// Bishop and queen won't move if a piece in blocks it
function elementInMid(prev, next) {
    let chars = 'abcdefgh';
    let sn = parseInt(prev[1]);
    let en = parseInt(next[1]);
    let sc = chars.indexOf(prev[0]);
    let ec = chars.indexOf(next[0]);
    let ans = false;
    let count = 0;

    if ((Math.abs(sn - en) == 1) || (Math.abs(sc - ec) == 1)) {
        return ans;
    } else {
        if ((sn > en) && (sc > ec)) {
            count = en + 1;
            for (let i = ec + 1; i < sc; i++) {
                if (document.getElementById(`${chars[i]}${count}`).lastElementChild != null) {
                    ans = true;
                    break;
                } else {
                    ans = false;
                }
                count += 1;
            }
            return ans;
        } else if ((sn < en) && (sc > ec)) {
            count = en - 1;
            for (let i = ec + 1; i < sc; i++) {
                if (document.getElementById(`${chars[i]}${count}`).lastElementChild != null) {
                    ans = true;
                    break;
                } else {
                    ans = false;
                }
                count -= 1;
            }
            return ans;
        } else if ((sn > en) && (sc < ec)) {
            count = sn - 1;
            for (let i = sc + 1; i < ec; i++) {
                if (document.getElementById(`${chars[i]}${count}`).lastElementChild != null) {
                    ans = true;
                    break;
                } else {
                    ans = false;
                }
                count -= 1;
            }
            return ans;
        } else if ((sn < en) && (sc < ec)) {
            count = sn + 1;
            for (let i = sc + 1; i < ec; i++) {
                if (document.getElementById(`${chars[i]}${count}`).lastElementChild != null) {
                    ans = true;
                    break;
                } else {
                    ans = false;
                }
                count += 1;
            }
            return ans;
        }
    }
}

// Rotate the chessboard after every move
// let deg = 0;

// function rotate() {
//     let id = setInterval(frame, 2);

//     function frame() {
//         chess.style.transform = `rotate(${String(deg + 180)}deg)`;
//         deg = deg + 180;
//     }
// }