const { getPrefix, setPrefix } = require('../lib/prefix');
const isOwnerOrSudo = require('../lib/isOwner');

async function setprefixCommand(sock, chatId, message, args) {
    try {
        const senderId = message.key.participant || message.key.remoteJid;
        const isOwner = await isOwnerOrSudo(senderId, sock, chatId);

        if (!message.key.fromMe && !isOwner) {
            await sock.sendMessage(chatId, {
                text: '❌ Only the bot owner can change the prefix.'
            }, { quoted: message });
            return;
        }

        const newPrefix = args.trim();

        if (!newPrefix) {
            const current = getPrefix();
            await sock.sendMessage(chatId, {
                text: `*PREFIX SETTINGS*\n\n• Current prefix: *${current}*\n\nUsage: ${current}setprefix <new_prefix>\nExample: ${current}setprefix !`
            }, { quoted: message });
            return;
        }

        if (newPrefix.length > 5) {
            await sock.sendMessage(chatId, {
                text: '❌ Prefix must be 5 characters or less.'
            }, { quoted: message });
            return;
        }

        const oldPrefix = getPrefix();
        setPrefix(newPrefix);

        await sock.sendMessage(chatId, {
            text: `✅ *Prefix updated successfully!*\n\n• Old prefix: *${oldPrefix}*\n• New prefix: *${newPrefix}*\n\nExample: *${newPrefix}alive*, *${newPrefix}help*`
        }, { quoted: message });

    } catch (error) {
        console.error('Error in setprefix command:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to update prefix.'
        }, { quoted: message });
    }
}

module.exports = setprefixCommand;
