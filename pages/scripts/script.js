const commands = { // commands
    'help': 'whoami - About CertifiedRice\n' + 'contact - how to contact me!\n' + 'top - My top languages\nclear - clear the terminal\ncontributors - people who helped me make this website',
    'whoami': 'Who am I?: My name is CertifiedRice and I am a passionate game developer and Front-End developer.',
    'contact': 'Twitter: @Certified_Rice , Discord: Certified Rice#8386, Github: CertifiedRice, Steam: certified_rice',
    'top': 'My top languages: Lua, C#, Java, Python, Javascript, and C/C++',
    'clear': 'Cleaers the terminal',
    'contributors': 'Opensource contributors for my website'
}

var commandMemory = [];
var currentData = '';
var textArea = document.getElementById('textarea');
var cmdArea = document.getElementById('cmd-area');

const acceptedChars = [" ", ".", ",", "(", ")", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

// get what action the user is tring to accomplish by pressing this key
const getAction = (key) => {
    switch (key) {
        case 'Backspace':
            return 'back'
        case 'Enter':
            return 'run'
        case 'ArrowUp':
            return 'last-cmd'
        default:
            return 'cmd'
    }
}

var cmdBackCount = 1;

const keypress = (key, action) => {
    console.log(key)
    if (action === 'cmd') {
        if (acceptedChars.indexOf(key) !== -1) {
            currentData+=key;
            textArea.innerHTML = `❯ ${currentData}█`
        }
    } else if (action === 'back') {
        currentData = currentData.slice(0,currentData.length-1);
        textArea.innerHTML = `❯ ${currentData}█`
    } else if (action === 'run') {
        cmdBackCount = 1;
        commandMemory.push(currentData);
        textArea.innerHTML = `❯ ${currentData}`
        callCommand(currentData);
    } else if (action === 'last-cmd') {
        currentData = commandMemory[commandMemory.length-cmdBackCount] ? commandMemory[commandMemory.length-cmdBackCount] : '';
        textArea.innerHTML = `❯ ${currentData}█`
        cmdBackCount+=1;
    }
}


const newTextarea = () => {
    var h = document.getElementsByClassName('cmd-textarea')[0];
    var j = document.createElement('span');
    h.innerHTML += '<br /><span class="cmd-text cmd-green">guest</span>@<span class="cmd-text cmd-cyan">CertifiedRice</span><br>';
    j.innerHTML = '❯ █'
    return h.appendChild(j);
}

const newCmdArea = () => {
    var h = document.getElementsByClassName('cmd-textarea')[0];
    var j = document.createElement('span');
    h.innerHTML += '<br />';
    return h.appendChild(j);
}

const commandCleanup = () => {
    textArea = newTextarea();
    currentData = '';
}

const getCommandOutput = (command) => {
    if (command === "help") {
        return commands.help;
    } else if (command === 'whoami') {
        return commands.whoami;
    } else if (command === "contact") {
        return commands.contact;
    } else if (command === "top") {
        return commands.top;
    } else if (command === "clear") {
        return location.reload();
    } else if (command === "contributors") {
        return window.location = "https://certifiedrice.github.io/pages/contributors";
    } else if (command === "rickroll") {
        return window.location = "https://youtu.be/dQw4w9WgXcQ";
    } else {
        return `Unknown command: <span class="cmd-text cmd-green">${command}</span>`;
    }
}

const callCommand = (command) => {
    
    cmdArea = newCmdArea();
    cmdArea.innerHTML += getCommandOutput(command) + '<br>';
    commandCleanup();
    var h = document.getElementsByClassName('cmd-textarea')[0];
    h.scrollTop = h.scrollHeight;
}

document.addEventListener('keydown', (e) => {
    keypress(e.key, getAction(e.key))
})