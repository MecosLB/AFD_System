const NOFILE = 'Ninguno',
    txtArea = document.getElementById('txtContent'),
    txtWebCount = document.getElementById('webCount'),
    txtEbayCount = document.getElementById('ebayCount');
let preparedText = [],
    webCount = 0,
    ebayCount = 0;

// STATE FUNCTIONS
const checkFinish = (charIndex) => {
    return charIndex >= preparedText.length;
}

const state_1 = (charIndex) => {
    if (checkFinish(charIndex)) return;

    switch (preparedText[charIndex].toLowerCase()) {
        case 'w':
            state_12(++charIndex);
            break;
        case 'e':
            state_15(++charIndex);
            break;
        default:
            state_1(++charIndex);
    }
};

const state_12 = (charIndex) => {
    if (checkFinish(charIndex)) return;

    switch (preparedText[charIndex].toLowerCase()) {
        case 'w':
            state_12(++charIndex);
            break;
        case 'e':
            state_135(++charIndex);
            break;
        default:
            state_1(++charIndex);
    }
};

const state_15 = (charIndex) => {
    if (checkFinish(charIndex)) return;

    switch (preparedText[charIndex].toLowerCase()) {
        case 'w':
            state_12(++charIndex);
            break;
        case 'e':
            state_15(++charIndex);
            break;
        case 'b':
            state_16(++charIndex);
            break;
        default:
            state_1(++charIndex);
    }
};

const state_16 = (charIndex) => {
    if (checkFinish(charIndex)) return;

    switch (preparedText[charIndex].toLowerCase()) {
        case 'w':
            state_12(++charIndex);
            break;
        case 'e':
            state_15(++charIndex);
            break;
        case 'a':
            state_17(++charIndex);
            break;
        default:
            state_1(++charIndex);
    }
};

const state_17 = (charIndex) => {
    if (checkFinish(charIndex)) return;

    switch (preparedText[charIndex].toLowerCase()) {
        case 'w':
            state_12(++charIndex);
            break;
        case 'e':
            state_15(++charIndex);
            break;
        case 'y':
            state_18(++charIndex);
            break;
        default:
            state_1(++charIndex);
    }
};

const state_18 = (charIndex) => {
    ebayCount++;

    if (checkFinish(charIndex)) return;

    switch (preparedText[charIndex].toLowerCase()) {
        case 'w':
            state_12(++charIndex);
            break;
        case 'e':
            state_15(++charIndex);
            break;
        default:
            state_1(++charIndex);
    }
};

const state_135 = (charIndex) => {
    if (checkFinish(charIndex)) return;

    switch (preparedText[charIndex].toLowerCase()) {
        case 'w':
            state_12(++charIndex);
            break;
        case 'e':
            state_15(++charIndex);
            break;
        case 'b':
            state_146(++charIndex);
            break;
        default:
            state_1(++charIndex);
    }
};

const state_146 = (charIndex) => {
    webCount++;

    if (checkFinish(charIndex)) return;

    switch (preparedText[charIndex].toLowerCase()) {
        case 'w':
            state_12(++charIndex);
            break;
        case 'e':
            state_15(++charIndex);
            break;
        case 'a':
            state_17(++charIndex);
            break;
        default:
            state_1(++charIndex);
    }
};

// GENERAL FUNCTIONS

// Clicker helper for design purposes.
const clickUpload = () => {
    document.getElementById('inputUpload').click();
};

// Update file name in the UI.
const setFileName = (file) => {
    const fileName = file.target.files.length ? file.target.files[0].name : NOFILE,
        txtFileName = document.getElementById('fileName');

    txtFileName.innerText = fileName;
};

// Read file and its content.
const readFile = (file) => {
    setFileName(file);
    txtWebCount.innerText = 0;
    txtEbayCount.innerText = 0;

    const fileUploaded = file.target.files[0],
        reader = new FileReader();

    if (!fileUploaded) {
        txtArea.value = '';
        return;
    }

    reader.onload = (e) => {
        const content = e.target.result;
        setText(content);
    };

    reader.readAsText(fileUploaded);
};

// Set file text in the textarea.
const setText = (fileText) => {
    txtArea.value = fileText;
};

// Pass the file text to a char array.
const prepareText = (fileText) => {
    preparedText = [];

    for (const char of fileText)
        preparedText.push(char);
}

// Count web & ebay words in whole text.
const countText = () => {
    // Restart the count.
    webCount = 0;
    ebayCount = 0;

    // Prepare text
    prepareText(txtArea.value);

    // Start on the initial state.
    state_1(0);
    txtWebCount.innerText = webCount;
    txtEbayCount.innerText = ebayCount;
}

// EVENTS
document.addEventListener("DOMContentLoaded", () => {
    const btnUpload = document.getElementById('uploadFile'),
        btnCount = document.getElementById('countText'),
        inputFile = document.getElementById('inputUpload');

    btnUpload.addEventListener('click', clickUpload);

    btnCount.addEventListener('click', countText);

    inputFile.addEventListener('change', readFile);
});