// This plugin was created by God's Zeal Tech 
// Don't Edit Or share without given me credits 

const axios = require('axios');
const os = require('os');
const moment = require('moment');
const settings = require('../settings');
// Format uptime properly
function formatUptime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds = seconds % (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds = seconds % (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

// Format RAM usage
function formatRam(total, free) {
    const used = (total - free) / (1024 * 1024 * 1024);
    const totalGb = total / (1024 * 1024 * 1024);
    const percent = ((used / totalGb) * 100).toFixed(1);
    return `${used.toFixed(1)}GB / ${totalGb.toFixed(1)}GB (${percent}%)`;
}

async function aliveCommand(sock, chatId, message) {
    try {
        // Get system information
        const uptime = formatUptime(process.uptime());
        const ramUsage = formatRam(os.totalmem(), os.freemem());
        const cpuModel = os.cpus()[0].model.split(' ')[0];
        const cpuSpeed = os.cpus()[0].speed;
        const platform = `${process.platform} ${os.release()}`;
        const nodeVersion = process.version.replace('v', '');
        
        // Format current time and date
        const now = moment();
        const currentTime = now.format("HH:mm:ss");
        const currentDate = now.format("dddd, MMMM Do YYYY");
        
        // Create animated status indicator
        const statusIndicators = ['⠇', '⠧', '⠏', '⠛', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧'];
        const randomIndicator = statusIndicators[Math.floor(Math.random() * statusIndicators.length)];
        
        // Create animated loading bar
        const loadingBarLength = 15;
        const filledLength = Math.floor(Math.random() * loadingBarLength);
        const loadingBar = '▰'.repeat(filledLength) + '▱'.repeat(loadingBarLength - filledLength);
        
        // Format the alive message with animation effects
        const aliveMessage = `┌ ❏ *⌜ GODSZEAL XMD STATUS ⌟* ❏
│
├◆ ${randomIndicator} *Status:* ✅ Operational
├◆ ⏱️ *Uptime:* ${uptime}
├◆ 📅 *Date:* ${currentDate}
├◆ ⏰ *Time:* ${currentTime}
├◆ 💻 *Platform:* Chrome Ubuntu
├◆ 🧠 *Runtime:* Node.js ${nodeVersion}
├◆ 📦 *Version:* ${settings.version || '2.0.5'}
├◆ 🔐 *Mode:* ${settings.mode || 'Public'}
│
├◆ 📊 *System Resources:*
├◆ 💾 RAM: ${ramUsage}
├◆ ⚙️ CPU: ${cpuModel} @ ${cpuSpeed}MHz
├◆ 🖥️ Platform: ${platform}
│
├◆ 📈 *System Health:* 
├◆ ${loadingBar} ${Math.floor(Math.random() * 100)}%
│
├◆ 🌐 *Bot Features:*
├◆ • 100+ Commands
├◆ • Movie Search & Download
├◆ • Group Contact Export
├◆ • API Creation Tools
│
├◆ ✨ *Thank you for using GODSZEAL XMD!*
└ ❏
‎
${'='.repeat(30)}
⚡ *GODSZEAL XMD is running smoothly!*
💡 *Type .help for command list*
${'='.repeat(30)}`;

        const contextInfo = {
            forwardingScore: 1,
            isForwarded: true,
            mentionedJid: [message.key.remoteJid],
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363269950668068@newsletter',
                newsletterName: '❦ ════ •⊰❂ GODSZEAL XMD  ❂⊱• ════ ❦',
                serverMessageId: -1
            }
        };

        // Try sending with video, fall back to text-only if video is unavailable
        try {
            await sock.sendMessage(chatId, {
                video: { url: 'https://files.catbox.moe/h43im9.mp4' },
                caption: aliveMessage,
                contextInfo
            }, { quoted: message });
        } catch (videoError) {
            await sock.sendMessage(chatId, {
                text: aliveMessage,
                contextInfo
            }, { quoted: message });
        }

    } catch (error) {
        console.error('Alive Command Error:', error);
        
        // Create error box
        const errorBox = `┌ ❏ *⌜ ALIVE ERROR ⌟* ❏
│
├◆ ❌ Failed to check bot status
├◆ 🔍 Error: ${error.message.substring(0, 50)}...
└ ❏`;
        
        await sock.sendMessage(chatId, {
            text: errorBox,
            react: { text: '❌', key: message.key }
        });
    }
}

module.exports = aliveCommand;