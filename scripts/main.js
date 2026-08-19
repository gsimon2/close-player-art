const constants = {
    modName: 'close-player-art'
};

const socketName = `module.${constants.modName}`;

const closeImagePopout = () => {
    const imagePopout = document.querySelector('.image-popout button[data-action="close"]');
    if (imagePopout) {
        imagePopout.click();
        return;
    }

    const legacyImagePopout = document.querySelector(".image-popout a.close");
    if (legacyImagePopout) {
        legacyImagePopout.click();
        return;
    }

    const journalPopout = document.querySelector(".journal-sheet a.close");
    if (journalPopout) {
        journalPopout.click();
        return;
    }
};

Hooks.on("init", () => {

    game.keybindings.register(constants.modName, "hotkey", {
        name: `${constants.modName}.settings.hotkey.name`,
        hint: `${constants.modName}.settings.hotkey.hint`,
        editable: [{ key: "`", modifiers: ["Shift"] }],
        onDown: (e) => {
            if (game.user.isGM === true) {
                if (
                    e.event.target.tagName.toUpperCase() != "INPUT" &&
                    e.event.target.tagName.toUpperCase() != "TEXTAREA"
                ) {
                    closeImagePopout();
                    game.socket.emit(socketName);
                }
            }
        }
    });

});

Hooks.on("ready", () => {
    game.socket.on(socketName, closeImagePopout);
});
