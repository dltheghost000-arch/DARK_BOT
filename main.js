// 🧹 Fix for ENOSPC / temp overflow in hosted panels
const fs = require('fs');
const path = require('path');

// Redirect temp storage away from system /tmp
const customTemp = path.join(process.cwd(), 'temp');
if (!fs.existsSync(customTemp)) fs.mkdirSync(customTemp, { recursive: true });
process.env.TMPDIR = customTemp;
process.env.TEMP = customTemp;
process.env.TMP = customTemp;

// Auto-cleaner every 3 hours
setInterval(() => {
    fs.readdir(customTemp, (err, files) => {
        if (err) return;
        for (const file of files) {
            const filePath = path.join(customTemp, file);
            fs.stat(filePath, (err, stats) => {
                if (!err && Date.now() - stats.mtimeMs > 3 * 60 * 60 * 1000) {
                    fs.unlink(filePath, () => { });
                }
            });
        }
    });
    console.log('🧹 Temp folder auto-cleaned');
}, 3 * 60 * 60 * 1000);

const settings = require('./settings');
require('./config.js');
const { isBanned } = require('./lib/isBanned');
const { isSudo } = require('./lib/index');
const isOwnerOrSudo = require('./lib/isOwner');
const { autotypingCommand, handleAutotypingForMessage, showTypingAfterCommand } = require('./commands/autotyping');
const { autoreadCommand, handleAutoread } = require('./commands/autoread');

// Import owner and VIP system
const { isOwner, isVip, addOwner, removeOwner, addVip, removeVip, listOwners } = require('./lib/ownerManager');

// Command imports
const tagAllCommand = require('./commands/tagall');
const helpCommand = require('./commands/help');
const banCommand = require('./commands/ban');
const { promoteCommand } = require('./commands/promote');
const { demoteCommand } = require('./commands/demote');
const muteCommand = require('./commands/mute');
const unmuteCommand = require('./commands/unmute');
const stickerCommand = require('./commands/sticker');
const isAdmin = require('./lib/isAdmin');
const warnCommand = require('./commands/warn');
const warningsCommand = require('./commands/warnings');
const ttsCommand = require('./commands/tts');
const { tictactoeCommand, handleTicTacToeMove } = require('./commands/tictactoe');
const { incrementMessageCount, topMembers } = require('./commands/topmembers');
const ownerCommand = require('./commands/owner');
const deleteCommand = require('./commands/delete');
const { handleAntilinkCommand } = require('./commands/antilink');
const { handleAntitagCommand, handleTagDetection } = require('./commands/antitag');
const { Antilink } = require('./lib/antilink');
const { handleMentionDetection, mentionToggleCommand, setMentionCommand } = require('./commands/mention');
const memeCommand = require('./commands/meme');
const tagCommand = require('./commands/tag');
const tagNotAdminCommand = require('./commands/tagnotadmin');
const hideTagCommand = require('./commands/hidetag');
const jokeCommand = require('./commands/joke');
const quoteCommand = require('./commands/quote');
const factCommand = require('./commands/fact');
const weatherCommand = require('./commands/weather');
const newsCommand = require('./commands/news');
const kickCommand = require('./commands/kick');
const simageCommand = require('./commands/simage');
const attpCommand = require('./commands/attp');
const { startHangman, guessLetter } = require('./commands/hangman');
const { startTrivia, answerTrivia } = require('./commands/trivia');
const { complimentCommand } = require('./commands/compliment');
const { insultCommand } = require('./commands/insult');
const { eightBallCommand } = require('./commands/eightball');
const { lyricsCommand } = require('./commands/lyrics');
const { dareCommand } = require('./commands/dare');
const { truthCommand } = require('./commands/truth');
const { clearCommand } = require('./commands/clear');
const pingCommand = require('./commands/ping');
const aliveCommand = require('./commands/alive');
const blurCommand = require('./commands/img-blur');
const { welcomeCommand, handleJoinEvent } = require('./commands/welcome');
const { goodbyeCommand, handleLeaveEvent } = require('./commands/goodbye');
const githubCommand = require('./commands/github');
const { handleBadwordDetection } = require('./lib/antibadword');
const antibadwordCommand = require('./commands/antibadword');
const { handleChatbotCommand, handleChatbotResponse } = require('./commands/chatbot');
const takeCommand = require('./commands/take');
const { flirtCommand } = require('./commands/flirt');
const characterCommand = require('./commands/character');
const wastedCommand = require('./commands/wasted');
const shipCommand = require('./commands/ship');
const groupInfoCommand = require('./commands/groupinfo');
const resetlinkCommand = require('./commands/resetlink');
const staffCommand = require('./commands/staff');
const unbanCommand = require('./commands/unban');
const emojimixCommand = require('./commands/emojimix');
const { handlePromotionEvent } = require('./commands/promote');
const { handleDemotionEvent } = require('./commands/demote');
const viewOnceCommand = require('./commands/viewonce');
const clearSessionCommand = require('./commands/clearsession');
const { autoStatusCommand, handleStatusUpdate } = require('./commands/autostatus');
const { simpCommand } = require('./commands/simp');
const { stupidCommand } = require('./commands/stupid');
const stickerTelegramCommand = require('./commands/stickertelegram');
const textmakerCommand = require('./commands/textmaker');
const { handleAntideleteCommand, handleMessageRevocation, storeMessage } = require('./commands/antidelete');
const clearTmpCommand = require('./commands/cleartmp');
const setProfilePicture = require('./commands/setpp');
const { setGroupDescription, setGroupName, setGroupPhoto } = require('./commands/groupmanage');
const instagramCommand = require('./commands/instagram');
const facebookCommand = require('./commands/facebook');
const spotifyCommand = require('./commands/spotify');
const playCommand = require('./commands/play');
const tiktokCommand = require('./commands/tiktok');
const songCommand = require('./commands/song');
const aiCommand = require('./commands/ai');
const urlCommand = require('./commands/url');
const { handleTranslateCommand } = require('./commands/translate');
const { handleSsCommand } = require('./commands/ss');
const { addCommandReaction, handleAreactCommand } = require('./lib/reactions');
const { goodnightCommand } = require('./commands/goodnight');
const { shayariCommand } = require('./commands/shayari');
const { rosedayCommand } = require('./commands/roseday');
const imagineCommand = require('./commands/imagine');
const videoCommand = require('./commands/video');
const sudoCommand = require('./commands/sudo');
const { miscCommand, handleHeart } = require('./commands/misc');
const { animeCommand } = require('./commands/anime');
const { piesCommand, piesAlias } = require('./commands/pies');
const stickercropCommand = require('./commands/stickercrop');
const updateCommand = require('./commands/update');
const removebgCommand = require('./commands/removebg');
const { reminiCommand } = require('./commands/remini');
const { igsCommand } = require('./commands/igs');
const { anticallCommand, readState: readAnticallState } = require('./commands/anticall');
const { pmblockerCommand, readState: readPmBlockerState } = require('./commands/pmblocker');
const settingsCommand = require('./commands/settings');
const soraCommand = require('./commands/sora');

// Global settings
global.packname = settings.packname;
global.author = settings.author;
global.channelLink = "https://whatsapp.com/channel/0029VbCPMmgAO7RJCyN7bo2j";
global.ytch = "DARK CHANNEL";

const channelInfo = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363161513685998@newsletter',
            newsletterName: 'DARK CHANNEL',
            serverMessageId: -1
        }
    }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function handleMessages(sock, messageUpdate, printLog) {
    try {
        const { messages, type } = messageUpdate;
        if (type !== 'notify') return;

        const message = messages[0];
        if (!message?.message) return;

        await handleAutoread(sock, message);

        if (message.message) {
            storeMessage(sock, message);
        }

        if (message.message?.protocolMessage?.type === 0) {
            await handleMessageRevocation(sock, message);
            return;
        }

        const chatId = message.key.remoteJid;
        const senderId = message.key.participant || message.key.remoteJid;
        const isGroup = chatId.endsWith('@g.us');
        const senderIsSudo = await isSudo(senderId);
        const senderIsOwnerOrSudo = await isOwnerOrSudo(senderId, sock, chatId);
        
        const isBotOwner = message.key.fromMe || senderId === sock.user.id.split(':')[0] + '@s.whatsapp.net';
        
        const isUserOwner = await isOwner(senderId);
        const isUserVip = await isVip(senderId);

        const userMessage = (
            message.message?.conversation?.trim() ||
            message.message?.extendedTextMessage?.text?.trim() ||
            message.message?.imageMessage?.caption?.trim() ||
            message.message?.videoMessage?.caption?.trim() ||
            ''
        ).toLowerCase().replace(/\.\s+/g, '.').trim();

        const rawText = message.message?.conversation?.trim() ||
            message.message?.extendedTextMessage?.text?.trim() ||
            message.message?.imageMessage?.caption?.trim() ||
            message.message?.videoMessage?.caption?.trim() ||
            '';

        if (userMessage.startsWith('.')) {
            console.log(`📝 Command: ${userMessage} from ${senderId}`);
        }

        let isPublic = true;
        try {
            const data = JSON.parse(fs.readFileSync('./data/messageCount.json'));
            if (typeof data.isPublic === 'boolean') isPublic = data.isPublic;
        } catch (error) {}

        const isOwnerOrSudoCheck = message.key.fromMe || senderIsOwnerOrSudo || isBotOwner || isUserOwner;

        if (isBanned(senderId) && !userMessage.startsWith('.unban')) {
            if (Math.random() < 0.1) {
                await sock.sendMessage(chatId, { text: '❌ You are banned.', ...channelInfo });
            }
            return;
        }

        if (!message.key.fromMe) incrementMessageCount(chatId, senderId);

        if (isGroup) {
            if (userMessage) {
                await handleBadwordDetection(sock, chatId, message, userMessage, senderId);
            }
            await Antilink(message, sock);
        }

        if (!isGroup && !message.key.fromMe && !senderIsSudo && !isBotOwner && !isUserOwner) {
            try {
                const pmState = readPmBlockerState();
                if (pmState.enabled) {
                    await sock.sendMessage(chatId, { text: pmState.message || 'Private messages are blocked.' });
                    await delay(1500);
                    try { await sock.updateBlockStatus(chatId, 'block'); } catch (e) { }
                    return;
                }
            } catch (e) { }
        }

        if (!userMessage.startsWith('.')) {
            await handleAutotypingForMessage(sock, chatId, userMessage);
            if (isGroup) {
                await handleTagDetection(sock, chatId, message, senderId);
                await handleMentionDetection(sock, chatId, message);
                if (isPublic || isOwnerOrSudoCheck) {
                    await handleChatbotResponse(sock, chatId, message, userMessage, senderId);
                }
            }
            return;
        }

        if (!isPublic && !isOwnerOrSudoCheck) {
            return;
        }

        const adminCommands = ['.mute', '.unmute', '.ban', '.unban', '.promote', '.demote', '.kick', '.tagall', '.tagnotadmin', '.hidetag', '.antilink', '.antitag', '.setgdesc', '.setgname', '.setgpp', '.lock', '.unlock', '.close', '.open', '.add', '.remove', '.rm', '.accept', '.reject', '.link', '.warn', '.delwarn', '.clearwarn', '.setwarnlimit', '.resetlink', '.welcome', '.goodbye', '.antibadword', '.chatbot', '.clear', '.delete', '.admins', '.groupinfo', '.staff'];
        const isAdminCommand = adminCommands.some(cmd => userMessage.startsWith(cmd));

        const ownerCommands = ['.mode', '.autostatus', '.antidelete', '.cleartmp', '.setpp', '.clearsession', '.areact', '.autoreact', '.autotyping', '.autoread', '.pmblocker', '.join', '.leave', '.addowner', '.removeowner', '.addvip', '.removevip', '.owners', '.update', '.settings', '.anticall'];
        const isOwnerCommand = ownerCommands.some(cmd => userMessage.startsWith(cmd));

        let isSenderAdmin = false;
        let isBotAdmin = false;

        if (isGroup && isAdminCommand) {
            const adminStatus = await isAdmin(sock, chatId, senderId);
            isSenderAdmin = adminStatus.isSenderAdmin;
            isBotAdmin = adminStatus.isBotAdmin;

            if (!isBotAdmin) {
                await sock.sendMessage(chatId, { text: '❌ Please make the bot an admin first.', ...channelInfo }, { quoted: message });
                return;
            }

            const requireAdmin = ['.mute', '.unmute', '.ban', '.unban', '.promote', '.demote', '.warn', '.delwarn', '.clearwarn', '.setwarnlimit', '.add', '.remove', '.rm', '.accept', '.reject', '.lock', '.unlock', '.close', '.open', '.link', '.resetlink', '.welcome', '.goodbye', '.setgdesc', '.setgname', '.setgpp', '.kick', '.tagall', '.tagnotadmin', '.hidetag', '.tag', '.antilink', '.antitag', '.antibadword', '.chatbot', '.clear', '.delete', '.admins', '.groupinfo'];
            if (requireAdmin.some(cmd => userMessage.startsWith(cmd))) {
                if (!isSenderAdmin && !message.key.fromMe && !senderIsOwnerOrSudo && !isBotOwner && !isUserOwner && !isUserVip) {
                    await sock.sendMessage(chatId, { text: '❌ Only group admins can use this command.', ...channelInfo }, { quoted: message });
                    return;
                }
            }
        }

        if (isOwnerCommand) {
            if (!message.key.fromMe && !senderIsOwnerOrSudo && !isBotOwner && !isUserOwner) {
                await sock.sendMessage(chatId, { text: '❌ Only owners can use this command!' }, { quoted: message });
                return;
            }
        }

        let commandExecuted = false;

        switch (true) {
            // ========== الأوامر الأساسية ==========
            
            case userMessage === '.simage': {
                const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
                if (quotedMessage?.stickerMessage) {
                    await simageCommand(sock, quotedMessage, chatId);
                } else {
                    await sock.sendMessage(chatId, { text: 'Reply to a sticker.', ...channelInfo }, { quoted: message });
                }
                break;
            }
            case userMessage.startsWith('.kick'):
                const mentionedJidListKick = message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
                await kickCommand(sock, chatId, senderId, mentionedJidListKick, message);
                break;
            case userMessage.startsWith('.mute'):
                {
                    const parts = userMessage.trim().split(/\s+/);
                    const muteArg = parts[1];
                    const muteDuration = muteArg !== undefined ? parseInt(muteArg, 10) : undefined;
                    if (muteArg !== undefined && (isNaN(muteDuration) || muteDuration <= 0)) {
                        await sock.sendMessage(chatId, { text: 'Provide a valid number of minutes.', ...channelInfo }, { quoted: message });
                    } else {
                        await muteCommand(sock, chatId, senderId, message, muteDuration);
                    }
                }
                break;
            case userMessage === '.unmute':
                await unmuteCommand(sock, chatId, senderId);
                break;
            case userMessage.startsWith('.ban'):
                await banCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.unban'):
                await unbanCommand(sock, chatId, message);
                break;
            case userMessage === '.help' || userMessage === '.menu' || userMessage.startsWith('.menu '):
                await helpCommand(sock, chatId, message);
                break;
            case userMessage === '.sticker' || userMessage === '.s':
                await stickerCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.warnings'):
                const mentionedJidListWarnings = message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
                await warningsCommand(sock, chatId, mentionedJidListWarnings);
                break;
            case userMessage.startsWith('.warn'):
                const mentionedJidListWarn = message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
                await warnCommand(sock, chatId, senderId, mentionedJidListWarn, message);
                break;
            case userMessage.startsWith('.tts'):
                const text = userMessage.slice(4).trim();
                await ttsCommand(sock, chatId, text, message);
                break;
            case userMessage.startsWith('.delete') || userMessage.startsWith('.del'):
                await deleteCommand(sock, chatId, message, senderId);
                break;
            case userMessage.startsWith('.attp'):
                await attpCommand(sock, chatId, message);
                break;
            case userMessage === '.settings':
                await settingsCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.mode'):
                if (!message.key.fromMe && !senderIsOwnerOrSudo && !isBotOwner && !isUserOwner) {
                    await sock.sendMessage(chatId, { text: 'Only bot owner can use this command!', ...channelInfo }, { quoted: message });
                    return;
                }
                let data;
                try {
                    data = JSON.parse(fs.readFileSync('./data/messageCount.json'));
                } catch (error) {
                    data = { isPublic: true };
                }
                const action = userMessage.split(' ')[1]?.toLowerCase();
                if (!action) {
                    await sock.sendMessage(chatId, { text: `Current mode: ${data.isPublic ? 'public' : 'private'}\n.mode public/private` });
                    return;
                }
                if (action === 'public' || action === 'private') {
                    data.isPublic = action === 'public';
                    fs.writeFileSync('./data/messageCount.json', JSON.stringify(data, null, 2));
                    await sock.sendMessage(chatId, { text: `✅ Bot is now in *${action}* mode`, ...channelInfo });
                }
                break;
            case userMessage === '.owner':
                await ownerCommand(sock, chatId);
                break;
            case userMessage === '.tagall':
                await tagAllCommand(sock, chatId, senderId, message);
                break;
            case userMessage === '.tagnotadmin':
                await tagNotAdminCommand(sock, chatId, senderId, message);
                break;
            case userMessage.startsWith('.hidetag'):
                {
                    const messageText = rawText.slice(8).trim();
                    const replyMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage || null;
                    await hideTagCommand(sock, chatId, senderId, messageText, replyMessage, message);
                }
                break;
            case userMessage.startsWith('.tag'):
                const messageText = rawText.slice(4).trim();
                const replyMsg = message.message?.extendedTextMessage?.contextInfo?.quotedMessage || null;
                await tagCommand(sock, chatId, senderId, messageText, replyMsg, message);
                break;
            case userMessage.startsWith('.antilink'):
                await handleAntilinkCommand(sock, chatId, userMessage, senderId, isSenderAdmin, message);
                break;
            case userMessage.startsWith('.antitag'):
                await handleAntitagCommand(sock, chatId, userMessage, senderId, isSenderAdmin, message);
                break;
            case userMessage === '.meme':
                await memeCommand(sock, chatId, message);
                break;
            case userMessage === '.joke':
                await jokeCommand(sock, chatId, message);
                break;
            case userMessage === '.quote':
                await quoteCommand(sock, chatId, message);
                break;
            case userMessage === '.fact':
                await factCommand(sock, chatId, message, message);
                break;
            case userMessage.startsWith('.weather'):
                const city = userMessage.slice(9).trim();
                if (city) {
                    await weatherCommand(sock, chatId, message, city);
                }
                break;
            case userMessage === '.news':
                await newsCommand(sock, chatId);
                break;
            case userMessage === '.ping':
                await pingCommand(sock, chatId, message);
                break;
            case userMessage === '.alive':
                await aliveCommand(sock, chatId, message);
                break;
            case userMessage === '.git':
            case userMessage === '.github':
            case userMessage === '.repo':
                await githubCommand(sock, chatId, message);
                break;
            
            // ========== أوامر promote و demote ==========
            
            case userMessage.startsWith('.promote'):
                {
                    const promoteMentions = message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
                    if (promoteMentions.length === 0) {
                        await sock.sendMessage(chatId, { text: '❌ Please mention the user to promote.\nExample: .promote @user' });
                        break;
                    }
                    for (const jid of promoteMentions) {
                        try {
                            await sock.groupParticipantsUpdate(chatId, [jid], 'promote');
                        } catch (err) {
                            await sock.sendMessage(chatId, { text: `❌ Failed to promote @${jid.split('@')[0]}` });
                        }
                    }
                    await sock.sendMessage(chatId, { text: `✅ Promoted ${promoteMentions.length} member(s).` });
                }
                break;
                
            case userMessage.startsWith('.demote'):
                {
                    const demoteMentions = message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
                    if (demoteMentions.length === 0) {
                        await sock.sendMessage(chatId, { text: '❌ Please mention the user to demote.\nExample: .demote @user' });
                        break;
                    }
                    for (const jid of demoteMentions) {
                        try {
                            await sock.groupParticipantsUpdate(chatId, [jid], 'demote');
                        } catch (err) {
                            await sock.sendMessage(chatId, { text: `❌ Failed to demote @${jid.split('@')[0]}` });
                        }
                    }
                    await sock.sendMessage(chatId, { text: `✅ Demoted ${demoteMentions.length} member(s).` });
                }
                break;
            
            // ========== أوامر إدارة المجموعة ==========
            
            case userMessage === '.lock':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
                    break;
                }
                if (!isBotAdmin) {
                    await sock.sendMessage(chatId, { text: '❌ Make the bot an admin first.' });
                    break;
                }
                await sock.groupSettingUpdate(chatId, 'announcement');
                await sock.sendMessage(chatId, { text: '🔒 *Group Locked*\nOnly admins can send messages.' });
                break;
                
            case userMessage === '.unlock':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
                    break;
                }
                if (!isBotAdmin) {
                    await sock.sendMessage(chatId, { text: '❌ Make the bot an admin first.' });
                    break;
                }
                await sock.groupSettingUpdate(chatId, 'not_announcement');
                await sock.sendMessage(chatId, { text: '🔓 *Group Unlocked*\nAll members can send messages.' });
                break;
                
            case userMessage === '.close':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
                    break;
                }
                if (!isBotAdmin) {
                    await sock.sendMessage(chatId, { text: '❌ Make the bot an admin first.' });
                    break;
                }
                await sock.groupSettingUpdate(chatId, 'announcement');
                await sock.sendMessage(chatId, { text: '🔴 *Group Closed*' });
                break;
                
            case userMessage === '.open':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
                    break;
                }
                if (!isBotAdmin) {
                    await sock.sendMessage(chatId, { text: '❌ Make the bot an admin first.' });
                    break;
                }
                await sock.groupSettingUpdate(chatId, 'not_announcement');
                await sock.sendMessage(chatId, { text: '🟢 *Group Opened*' });
                break;
                
            case userMessage === '.link':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
                    break;
                }
                if (!isBotAdmin) {
                    await sock.sendMessage(chatId, { text: '❌ Make the bot an admin first.' });
                    break;
                }
                try {
                    const inviteCode = await sock.groupInviteCode(chatId);
                    await sock.sendMessage(chatId, { text: `🔗 *Invite Link*\nhttps://chat.whatsapp.com/${inviteCode}` });
                } catch (err) {
                    await sock.sendMessage(chatId, { text: '❌ Failed to get invite link.' });
                }
                break;
                
            case userMessage === '.resetlink':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
                    break;
                }
                if (!isBotAdmin) {
                    await sock.sendMessage(chatId, { text: '❌ Make the bot an admin first.' });
                    break;
                }
                try {
                    await sock.groupRevokeInvite(chatId);
                    const newCode = await sock.groupInviteCode(chatId);
                    await sock.sendMessage(chatId, { text: `🔄 *Invite Link Reset*\nNew link: https://chat.whatsapp.com/${newCode}` });
                } catch (err) {
                    await sock.sendMessage(chatId, { text: '❌ Failed to reset invite link.' });
                }
                break;
                
            case userMessage.startsWith('.add'):
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
                    break;
                }
                if (!isBotAdmin) {
                    await sock.sendMessage(chatId, { text: '❌ Make the bot an admin first.' });
                    break;
                }
                const addArgs = userMessage.split(' ').slice(1);
                const mentionedForAdd = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
                let numbersToAdd = [...mentionedForAdd];
                for (const arg of addArgs) {
                    let num = arg.replace(/[^0-9]/g, '');
                    if (num.length >= 10) {
                        numbersToAdd.push(num + '@s.whatsapp.net');
                    }
                }
                if (numbersToAdd.length === 0) {
                    await sock.sendMessage(chatId, { text: '❌ Usage: .add 1234567890' });
                    break;
                }
                for (const num of numbersToAdd) {
                    try {
                        await sock.groupParticipantsUpdate(chatId, [num], 'add');
                        await sock.sendMessage(chatId, { text: `✅ Added @${num.split('@')[0]}`, mentions: [num] });
                    } catch (err) {
                        await sock.sendMessage(chatId, { text: `❌ Failed to add @${num.split('@')[0]}` });
                    }
                    await delay(1000);
                }
                break;
                
            case userMessage.startsWith('.remove') || userMessage.startsWith('.rm'):
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
                    break;
                }
                if (!isBotAdmin) {
                    await sock.sendMessage(chatId, { text: '❌ Make the bot an admin first.' });
                    break;
                }
                const removeMentions = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
                if (removeMentions.length === 0) {
                    await sock.sendMessage(chatId, { text: '❌ Mention the user to remove.' });
                    break;
                }
                await sock.groupParticipantsUpdate(chatId, removeMentions, 'remove');
                await sock.sendMessage(chatId, { text: `✅ Removed ${removeMentions.length} member(s).` });
                break;
                
            // ========== أوامر قبول ورفض الطلبات (معدلة) ==========
            
            case userMessage === '.accept' || userMessage === '.approve':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
                    break;
                }
                if (!isBotAdmin) {
                    await sock.sendMessage(chatId, { text: '❌ Make the bot an admin first.' });
                    break;
                }
                try {
                    const targetUser = message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
                    
                    if (targetUser) {
                        await sock.groupAcceptInviteRequest(chatId, targetUser);
                        await sock.sendMessage(chatId, { text: `✅ Approved join request for @${targetUser.split('@')[0]}`, mentions: [targetUser] });
                    } else {
                        const groupMetadata = await sock.groupMetadata(chatId);
                        const pendingRequests = groupMetadata.participants?.filter(p => p.isRequestToJoin) || [];
                        
                        if (pendingRequests.length === 0) {
                            await sock.sendMessage(chatId, { text: '📭 No pending join requests.' });
                            break;
                        }
                        
                        let approved = 0;
                        for (const req of pendingRequests) {
                            try {
                                await sock.groupAcceptInviteRequest(chatId, req.id);
                                approved++;
                            } catch (e) {}
                        }
                        await sock.sendMessage(chatId, { text: `✅ Approved ${approved} join request(s).` });
                    }
                } catch (err) {
                    console.error('Error:', err);
                    await sock.sendMessage(chatId, { text: '❌ Failed to approve request(s).' });
                }
                break;
                
            case userMessage === '.reject':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
                    break;
                }
                if (!isBotAdmin) {
                    await sock.sendMessage(chatId, { text: '❌ Make the bot an admin first.' });
                    break;
                }
                try {
                    const targetUser = message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
                    
                    if (targetUser) {
                        await sock.groupRejectInviteRequest(chatId, targetUser);
                        await sock.sendMessage(chatId, { text: `❌ Rejected join request for @${targetUser.split('@')[0]}`, mentions: [targetUser] });
                    } else {
                        const groupMetadata = await sock.groupMetadata(chatId);
                        const pendingRequests = groupMetadata.participants?.filter(p => p.isRequestToJoin) || [];
                        
                        if (pendingRequests.length === 0) {
                            await sock.sendMessage(chatId, { text: '📭 No pending join requests.' });
                            break;
                        }
                        
                        let rejected = 0;
                        for (const req of pendingRequests) {
                            try {
                                await sock.groupRejectInviteRequest(chatId, req.id);
                                rejected++;
                            } catch (e) {}
                        }
                        await sock.sendMessage(chatId, { text: `❌ Rejected ${rejected} join request(s).` });
                    }
                } catch (err) {
                    console.error('Error:', err);
                    await sock.sendMessage(chatId, { text: '❌ Failed to reject request(s).' });
                }
                break;
                
            case userMessage.startsWith('.delwarn') || userMessage.startsWith('.clearwarn'):
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
                    break;
                }
                const warnMentions = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
                if (warnMentions.length === 0) {
                    await sock.sendMessage(chatId, { text: '❌ Mention the user to clear warnings.' });
                    break;
                }
                let warnData = {};
                try {
                    warnData = JSON.parse(fs.readFileSync('./data/warns.json', 'utf-8'));
                } catch (e) {}
                for (const user of warnMentions) {
                    if (warnData[chatId]?.[user]) {
                        delete warnData[chatId][user];
                    }
                }
                fs.writeFileSync('./data/warns.json', JSON.stringify(warnData, null, 2));
                await sock.sendMessage(chatId, { text: `✅ Cleared warnings for ${warnMentions.length} user(s).` });
                break;
                
            case userMessage.startsWith('.setwarnlimit'):
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
                    break;
                }
                const warnLimit = parseInt(userMessage.split(' ')[1]);
                if (isNaN(warnLimit) || warnLimit < 1) {
                    await sock.sendMessage(chatId, { text: '❌ Usage: .setwarnlimit <number>' });
                    break;
                }
                global.WARN_COUNT = warnLimit;
                let warnSettings = {};
                try {
                    warnSettings = JSON.parse(fs.readFileSync('./data/warnSettings.json', 'utf-8'));
                } catch (e) {}
                warnSettings[chatId] = warnLimit;
                fs.writeFileSync('./data/warnSettings.json', JSON.stringify(warnSettings, null, 2));
                await sock.sendMessage(chatId, { text: `✅ Warning limit set to ${warnLimit}` });
                break;
                
            case userMessage.startsWith('.join'):
                if (!message.key.fromMe && !senderIsOwnerOrSudo && !isBotOwner && !isUserOwner) {
                    await sock.sendMessage(chatId, { text: '❌ Only bot owner can use this command.' });
                    break;
                }
                const joinLink = userMessage.split(' ')[1];
                if (!joinLink) {
                    await sock.sendMessage(chatId, { text: '❌ Usage: .join https://chat.whatsapp.com/xxxxx' });
                    break;
                }
                try {
                    const code = joinLink.match(/chat\.whatsapp\.com\/([a-zA-Z0-9]+)/)?.[1];
                    if (!code) throw new Error('Invalid link');
                    const groupId = await sock.groupAcceptInvite(code);
                    await sock.sendMessage(chatId, { text: `✅ Joined group: ${groupId}` });
                } catch (err) {
                    await sock.sendMessage(chatId, { text: `❌ Failed to join: ${err.message}` });
                }
                break;
                
            case userMessage.startsWith('.leave'):
                if (!message.key.fromMe && !senderIsOwnerOrSudo && !isBotOwner && !isUserOwner) {
                    await sock.sendMessage(chatId, { text: '❌ Only bot owner can use this command.' });
                    break;
                }
                if (isGroup) {
                    await sock.sendMessage(chatId, { text: '👋 Bot is leaving...' });
                    await delay(2000);
                    await sock.groupLeave(chatId);
                } else {
                    await sock.sendMessage(chatId, { text: '❌ Use this command in a group.' });
                }
                break;
            
            // ========== Owner Management Commands ==========
            
            case userMessage.startsWith('.addowner'):
                if (!message.key.fromMe && !isBotOwner) {
                    await sock.sendMessage(chatId, { text: '❌ Only main owner can use this command.' });
                    break;
                }
                const ownerToAdd = userMessage.split(' ')[1];
                if (!ownerToAdd) {
                    await sock.sendMessage(chatId, { text: '❌ Usage: .addowner 1234567890' });
                    break;
                }
                const ownerJid = ownerToAdd.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                await addOwner(ownerJid);
                await sock.sendMessage(chatId, { text: `✅ Added @${ownerJid.split('@')[0]} as co-owner.`, mentions: [ownerJid] });
                break;
            
            case userMessage.startsWith('.removeowner'):
                if (!message.key.fromMe && !isBotOwner) {
                    await sock.sendMessage(chatId, { text: '❌ Only main owner can use this command.' });
                    break;
                }
                const ownerToRemove = userMessage.split(' ')[1];
                if (!ownerToRemove) {
                    await sock.sendMessage(chatId, { text: '❌ Usage: .removeowner 1234567890' });
                    break;
                }
                const removeOwnerJid = ownerToRemove.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                await removeOwner(removeOwnerJid);
                await sock.sendMessage(chatId, { text: `✅ Removed @${removeOwnerJid.split('@')[0]} from owners.`, mentions: [removeOwnerJid] });
                break;
            
            case userMessage.startsWith('.addvip'):
                if (!message.key.fromMe && !isBotOwner && !isUserOwner) {
                    await sock.sendMessage(chatId, { text: '❌ Only owners can use this command.' });
                    break;
                }
                const vipToAdd = userMessage.split(' ')[1];
                if (!vipToAdd) {
                    await sock.sendMessage(chatId, { text: '❌ Usage: .addvip 1234567890' });
                    break;
                }
                const vipJid = vipToAdd.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                await addVip(vipJid);
                await sock.sendMessage(chatId, { text: `✅ Added @${vipJid.split('@')[0]} as VIP.`, mentions: [vipJid] });
                break;
            
            case userMessage.startsWith('.removevip'):
                if (!message.key.fromMe && !isBotOwner && !isUserOwner) {
                    await sock.sendMessage(chatId, { text: '❌ Only owners can use this command.' });
                    break;
                }
                const vipToRemove = userMessage.split(' ')[1];
                if (!vipToRemove) {
                    await sock.sendMessage(chatId, { text: '❌ Usage: .removevip 1234567890' });
                    break;
                }
                const removeVipJid = vipToRemove.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                await removeVip(removeVipJid);
                await sock.sendMessage(chatId, { text: `✅ Removed @${removeVipJid.split('@')[0]} from VIPs.`, mentions: [removeVipJid] });
                break;
            
            case userMessage === '.owners':
                if (!message.key.fromMe && !isBotOwner && !isUserOwner) {
                    await sock.sendMessage(chatId, { text: '❌ Only owners can use this command.' });
                    break;
                }
                const { owners, vips } = await listOwners();
                let ownersText = `👑 *Bot Owners:*\n\n`;
                owners.forEach(o => ownersText += `• @${o.split('@')[0]}\n`);
                ownersText += `\n⭐ *VIP Members:*\n\n`;
                vips.forEach(v => ownersText += `• @${v.split('@')[0]}\n`);
                await sock.sendMessage(chatId, { text: ownersText, mentions: [...owners, ...vips] });
                break;
            
            case userMessage === '.admins' || userMessage === '.staff':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
                    break;
                }
                try {
                    const metadata = await sock.groupMetadata(chatId);
                    const adminList = metadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin');
                    let adminText = '👑 *Group Admins*\n\n';
                    for (const admin of adminList) {
                        adminText += `• @${admin.id.split('@')[0]}\n`;
                    }
                    await sock.sendMessage(chatId, { text: adminText, mentions: adminList.map(a => a.id) });
                } catch (err) {
                    await sock.sendMessage(chatId, { text: `❌ Error: ${err.message}` });
                }
                break;
                
            case userMessage === '.groupinfo':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
                    break;
                }
                try {
                    const metadata = await sock.groupMetadata(chatId);
                    const totalMembers = metadata.participants.length;
                    const admins = metadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').length;
                    const groupInfoText = `📊 *Group Information*\n\n` +
                        `📛 *Name:* ${metadata.subject}\n` +
                        `🆔 *ID:* ${chatId}\n` +
                        `👥 *Members:* ${totalMembers}\n` +
                        `👑 *Admins:* ${admins}\n` +
                        `🔒 *Settings:* ${metadata.announce ? 'Locked (Admins only)' : 'Unlocked (All members)'}\n` +
                        `📝 *Description:* ${metadata.desc?.toString() || 'No description'}\n` +
                        `👤 *Owner:* @${metadata.owner?.split('@')[0] || 'Unknown'}`;
                    await sock.sendMessage(chatId, { text: groupInfoText, mentions: [metadata.owner] });
                } catch (err) {
                    await sock.sendMessage(chatId, { text: `❌ Error: ${err.message}` });
                }
                break;
                
            case userMessage === '.clear':
                if (isGroup) await clearCommand(sock, chatId);
                break;
                
            case userMessage === '.welcome':
                if (isGroup) {
                    if (!isSenderAdmin) {
                        const adminStatus = await isAdmin(sock, chatId, senderId);
                        isSenderAdmin = adminStatus.isSenderAdmin;
                    }
                    if (isSenderAdmin || message.key.fromMe || isUserOwner || isUserVip) {
                        await welcomeCommand(sock, chatId, message);
                    } else {
                        await sock.sendMessage(chatId, { text: 'Sorry, only group admins can use this command.', ...channelInfo }, { quoted: message });
                    }
                }
                break;
                
            case userMessage === '.goodbye':
                if (isGroup) {
                    if (!isSenderAdmin) {
                        const adminStatus = await isAdmin(sock, chatId, senderId);
                        isSenderAdmin = adminStatus.isSenderAdmin;
                    }
                    if (isSenderAdmin || message.key.fromMe || isUserOwner || isUserVip) {
                        await goodbyeCommand(sock, chatId, message);
                    } else {
                        await sock.sendMessage(chatId, { text: 'Sorry, only group admins can use this command.', ...channelInfo }, { quoted: message });
                    }
                }
                break;
                
            case userMessage.startsWith('.setgdesc'):
                {
                    const text = rawText.slice(9).trim();
                    await setGroupDescription(sock, chatId, senderId, text, message);
                }
                break;
                
            case userMessage.startsWith('.setgname'):
                {
                    const text = rawText.slice(9).trim();
                    await setGroupName(sock, chatId, senderId, text, message);
                }
                break;
                
            case userMessage.startsWith('.setgpp'):
                await setGroupPhoto(sock, chatId, senderId, message);
                break;
                
            case userMessage === '.antibadword':
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: 'This command can only be used in groups.', ...channelInfo }, { quoted: message });
                    break;
                }
                const adminStatus = await isAdmin(sock, chatId, senderId);
                isSenderAdmin = adminStatus.isSenderAdmin;
                isBotAdmin = adminStatus.isBotAdmin;
                if (!isBotAdmin) {
                    await sock.sendMessage(chatId, { text: '*Bot must be admin to use this feature*', ...channelInfo }, { quoted: message });
                    break;
                }
                await antibadwordCommand(sock, chatId, message, senderId, isSenderAdmin);
                break;
                
            case userMessage.startsWith('.chatbot'):
                if (!isGroup) {
                    await sock.sendMessage(chatId, { text: 'This command can only be used in groups.', ...channelInfo }, { quoted: message });
                    break;
                }
                const chatbotAdminStatus = await isAdmin(sock, chatId, senderId);
                if (!chatbotAdminStatus.isSenderAdmin && !message.key.fromMe && !isUserOwner && !isUserVip) {
                    await sock.sendMessage(chatId, { text: '*Only admins or bot owner can use this command*', ...channelInfo }, { quoted: message });
                    break;
                }
                const match = userMessage.slice(8).trim();
                await handleChatbotCommand(sock, chatId, message, match);
                break;
                
            case userMessage.startsWith('.anticall'):
                if (!message.key.fromMe && !senderIsOwnerOrSudo && !isBotOwner && !isUserOwner) {
                    await sock.sendMessage(chatId, { text: 'Only owner/sudo can use anticall.' }, { quoted: message });
                    break;
                }
                {
                    const args = userMessage.split(' ').slice(1).join(' ');
                    await anticallCommand(sock, chatId, message, args);
                }
                break;
                
            case userMessage.startsWith('.pmblocker'):
                {
                    const args = userMessage.split(' ').slice(1).join(' ');
                    await pmblockerCommand(sock, chatId, message, args);
                }
                commandExecuted = true;
                break;
                
            case userMessage === '.clearsession':
                await clearSessionCommand(sock, chatId, message);
                break;
                
            case userMessage === '.cleartmp':
                await clearTmpCommand(sock, chatId, message);
                break;
                
            case userMessage === '.setpp':
                await setProfilePicture(sock, chatId, message);
                break;
                
            case userMessage === '.update':
                {
                    const parts = rawText.trim().split(/\s+/);
                    const zipArg = parts[1] && parts[1].startsWith('http') ? parts[1] : '';
                    await updateCommand(sock, chatId, message, zipArg);
                }
                break;
                
            case userMessage.startsWith('.autoread'):
                await autoreadCommand(sock, chatId, message);
                break;
                
            case userMessage.startsWith('.autotyping'):
                await autotypingCommand(sock, chatId, message);
                break;
                
            case userMessage.startsWith('.autoreact'):
                await handleAreactCommand(sock, chatId, message, isOwnerOrSudoCheck);
                break;
                
            case userMessage.startsWith('.autostatus'):
                const autoStatusArgs = userMessage.split(' ').slice(1);
                await autoStatusCommand(sock, chatId, message, autoStatusArgs);
                break;
                
            case userMessage.startsWith('.antidelete'):
                const antideleteMatch = userMessage.slice(11).trim();
                await handleAntideleteCommand(sock, chatId, message, antideleteMatch);
                break;
                
            case userMessage === '.ttt' || userMessage === '.tictactoe':
                const tttText = userMessage.split(' ').slice(1).join(' ');
                await tictactoeCommand(sock, chatId, senderId, tttText);
                break;
                
            case userMessage === '.hangman':
                startHangman(sock, chatId);
                break;
                
            case userMessage === '.truth':
                await truthCommand(sock, chatId, message);
                break;
                
            case userMessage === '.dare':
                await dareCommand(sock, chatId, message);
                break;
                
            case userMessage === '.flirt':
                await flirtCommand(sock, chatId, message);
                break;
                
            case userMessage === '.shayari':
                await shayariCommand(sock, chatId, message);
                break;
                
            case userMessage === '.goodnight':
                await goodnightCommand(sock, chatId, message);
                break;
                
            case userMessage === '.roseday':
                await rosedayCommand(sock, chatId, message);
                break;
                
            case userMessage === '.heart':
                await handleHeart(sock, chatId, message);
                break;
                
            case userMessage === '.crop':
                await stickercropCommand(sock, chatId, message);
                break;
                
            case userMessage.startsWith('.pies'):
                {
                    const parts = rawText.trim().split(/\s+/);
                    const args = parts.slice(1);
                    await piesCommand(sock, chatId, message, args);
                }
                break;
                
            case userMessage.startsWith('.removebg'):
                await removebgCommand.exec(sock, message, userMessage.split(' ').slice(1));
                break;
                
            case userMessage.startsWith('.remini'):
                await reminiCommand(sock, chatId, message, userMessage.split(' ').slice(1));
                break;
                
            case userMessage.startsWith('.imagine'):
                await imagineCommand(sock, chatId, message);
                break;
                
            case userMessage.startsWith('.gpt') || userMessage.startsWith('.gemini'):
                await aiCommand(sock, chatId, message);
                break;
                
            case userMessage.startsWith('.play') || userMessage.startsWith('.song'):
                await songCommand(sock, chatId, message);
                break;
                
            case userMessage.startsWith('.video'):
                await videoCommand(sock, chatId, message);
                break;
                
            case userMessage.startsWith('.instagram') || userMessage.startsWith('.ig'):
                await instagramCommand(sock, chatId, message);
                break;
                
            case userMessage.startsWith('.facebook') || userMessage.startsWith('.fb'):
                await facebookCommand(sock, chatId, message);
                break;
                
            case userMessage.startsWith('.tiktok') || userMessage.startsWith('.tt'):
                await tiktokCommand(sock, chatId, message);
                break;
                
            case userMessage.startsWith('.spotify'):
                await spotifyCommand(sock, chatId, message);
                break;
                
            case userMessage.startsWith('.metallic'):
            case userMessage.startsWith('.ice'):
            case userMessage.startsWith('.neon'):
            case userMessage.startsWith('.fire'):
            case userMessage.startsWith('.glitch'):
                await textmakerCommand(sock, chatId, message, userMessage, userMessage.slice(1).split(' ')[0]);
                break;
                
            default:
                if (isGroup) {
                    if (userMessage) {
                        await handleChatbotResponse(sock, chatId, message, userMessage, senderId);
                    }
                    await handleTagDetection(sock, chatId, message, senderId);
                    await handleMentionDetection(sock, chatId, message);
                }
                commandExecuted = false;
                break;
        }

        if (commandExecuted !== false) {
            await showTypingAfterCommand(sock, chatId);
        }

        if (userMessage.startsWith('.')) {
            await addCommandReaction(sock, message);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (chatId) {
            await sock.sendMessage(chatId, { text: '❌ Failed to process command!', ...channelInfo });
        }
    }
}

async function handleGroupParticipantUpdate(sock, update) {
    try {
        const { id, participants, action, author } = update;
        if (!id.endsWith('@g.us')) return;

        let isPublic = true;
        try {
            const modeData = JSON.parse(fs.readFileSync('./data/messageCount.json'));
            if (typeof modeData.isPublic === 'boolean') isPublic = modeData.isPublic;
        } catch (e) {}

        if (action === 'promote') {
            if (!isPublic) return;
            await handlePromotionEvent(sock, id, participants, author);
            return;
        }
        if (action === 'demote') {
            if (!isPublic) return;
            await handleDemotionEvent(sock, id, participants, author);
            return;
        }
        if (action === 'add') {
            await handleJoinEvent(sock, id, participants);
        }
        if (action === 'remove') {
            await handleLeaveEvent(sock, id, participants);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {
    handleMessages,
    handleGroupParticipantUpdate,
    handleStatus: async (sock, status) => {
        await handleStatusUpdate(sock, status);
    }
};