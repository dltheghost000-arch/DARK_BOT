const settings = require('../settings');
const { isOwner, isVip } = require('../lib/ownerManager');

async function helpCommand(sock, chatId, message) {
    const senderId = message.key.participant || message.key.remoteJid;
    const isUserOwner = await isOwner(senderId);
    const isUserVip = await isVip(senderId);
    const isAdminOrOwner = isUserOwner || isUserVip || message.key.fromMe;
    
    let text = '';
    if (message.message?.conversation) text = message.message.conversation;
    if (message.message?.extendedTextMessage?.text) text = message.message.extendedTextMessage.text;
    
    const parts = text.split(' ');
    const category = parts[1] ? parts[1].toLowerCase() : '';
    
    // Context info مع رابط القناة المخفي
    const hiddenChannelInfo = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363161513685998@newsletter',
                newsletterName: 'DARK CHANNEL',
                serverMessageId: -1
            },
            externalAdReply: {
                title: '📢 Join Our Channel',
                body: 'Click to join',
                mediaType: 1,
                thumbnailUrl: '',
                sourceUrl: 'https://whatsapp.com/channel/0029VbCPMmgAO7RJCyN7bo2j'
            }
        }
    };
    
    const header = `╔══════════════════════════════════════╗
   *🤖 ${settings.botName || 'DARK BOT'}*  
   *Version:* ${settings.version || '3.0.0'}
   *By:* ${settings.botOwner || 'DARKLORD'}
   *YT:* ${global.ytch || 'DARK CHANNEL'}
╚══════════════════════════════════════╝`;
    
    if (category === 'admin') {
        if (!isAdminOrOwner) {
            await sock.sendMessage(chatId, { text: '❌ You are not authorized to view admin commands.', ...hiddenChannelInfo });
            return;
        }
        await sock.sendMessage(chatId, { 
            text: `${header}

👑 *ADMIN COMMANDS*

╔══════════════════════════════════════╗
║  👥 *Member Management*
╠══════════════════════════════════════╣
.ban @user         - Ban user
.unban @user       - Unban user
.kick @user        - Kick user
.promote @user     - Promote to admin
.demote @user      - Demote from admin
.add 1234567890    - Add member
.remove @user      - Remove member
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  ⚠️ *Warning System*
╠══════════════════════════════════════╣
.warn @user        - Warn user
.warnings @user    - Show warnings
.delwarn @user     - Clear warnings
.setwarnlimit 5    - Set warning limit
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  🔇 *Mute System*
╠══════════════════════════════════════╣
.mute 10          - Mute for 10 min
.unmute           - Unmute user
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  🔐 *Group Settings*
╠══════════════════════════════════════╣
.lock             - Lock group (admins only)
.unlock           - Unlock group
.close            - Close group
.open             - Open group
.link             - Get invite link
.resetlink        - Reset invite link
.tagall           - Tag all members
.tagnotadmin      - Tag non-admins
.tag <text>       - Tag with message
.hidetag <text>   - Hidden tag
.admins           - Show admins
.groupinfo        - Show group info
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  🛡️ *Protection*
╠══════════════════════════════════════╣
.antilink on/off  - Anti link
.antitag on/off   - Anti mention
.antibadword on/off - Anti bad words
.chatbot on/off   - Chatbot
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  👋 *Welcome/Goodbye*
╠══════════════════════════════════════╣
.welcome on/off   - Welcome message
.goodbye on/off   - Goodbye message
.setgdesc <text>  - Set description
.setgname <name>  - Set group name
.setgpp           - Set group photo
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  📥 *Join Requests*
╠══════════════════════════════════════╣
.accept          - Accept all requests
.accept @user    - Accept specific
.reject          - Reject all requests
.reject @user    - Reject specific
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  🗑️ *Other*
╠══════════════════════════════════════╣
.delete          - Delete message
.clear           - Clear chat
╚══════════════════════════════════════╝`,
            ...hiddenChannelInfo
        });
        return;
    }
    
    if (category === 'owner') {
        if (!isUserOwner && !message.key.fromMe) {
            await sock.sendMessage(chatId, { text: '❌ Only owners can view owner commands.', ...hiddenChannelInfo });
            return;
        }
        await sock.sendMessage(chatId, { 
            text: `${header}

⚙️ *OWNER COMMANDS*

╔══════════════════════════════════════╗
║  🚀 *Bot Control*
╠══════════════════════════════════════╣
.mode public/private  - Bot mode
.settings             - Bot settings
.update               - Update bot
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  👥 *Group Management*
╠══════════════════════════════════════╣
.join <link>          - Join group
.leave                - Leave group
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  🧹 *Cleanup*
╠══════════════════════════════════════╣
.clearsession         - Clear session
.cleartmp             - Clear temp files
.antidelete on/off    - Anti delete
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  🤖 *Auto Features*
╠══════════════════════════════════════╣
.autoread on/off      - Auto read
.autotyping on/off    - Auto typing
.autoreact on/off     - Auto react
.autostatus on/off    - Auto status
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  🛡️ *Protection*
╠══════════════════════════════════════╣
.anticall on/off      - Anti call
.pmblocker on/off     - Block private
.setpp                - Set bot photo
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  👑 *Owner Management*
╠══════════════════════════════════════╣
.addowner 1234567890  - Add co-owner
.removeowner 1234567890 - Remove owner
.addvip 1234567890    - Add VIP
.removevip 1234567890 - Remove VIP
.owners               - Show owners/VIPs
╚══════════════════════════════════════╝`,
            ...hiddenChannelInfo
        });
        return;
    }
    
    if (category === 'group') {
        await sock.sendMessage(chatId, { 
            text: `${header}

🔐 *GROUP MANAGEMENT*

╔══════════════════════════════════════╗
║  🔒 *Group Control*
╠══════════════════════════════════════╣
.lock           - Lock group (admins only)
.unlock         - Unlock group
.close          - Close group
.open           - Open group
.link           - Get invite link
.resetlink      - Reset invite link
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║  👥 *Member Management*
╠══════════════════════════════════════╣
.accept         - Accept all join requests
.accept @user   - Accept specific user
.reject         - Reject all join requests
.reject @user   - Reject specific user
.add 1234567890 - Add member
.remove @user   - Remove member
╚══════════════════════════════════════╝`,
            ...hiddenChannelInfo
        });
        return;
    }
    
    // القائمة الرئيسية
    await sock.sendMessage(chatId, { 
        text: `${header}

📌 *MAIN MENU*

╔══════════════════════════════════════╗
║  📋 *Available Categories*
╠══════════════════════════════════════╣
.menu admin      - Admin commands 🔒
.menu owner      - Owner commands 🔒
.menu group      - Group commands

╔══════════════════════════════════════╗
║  💡 *Examples*
╠══════════════════════════════════════╣
.menu admin      - Show admin commands
.menu owner      - Show owner commands
.menu group      - Show group commands

╔══════════════════════════════════════╗
║  🛡️ *Note*
╠══════════════════════════════════════╣
🔒 = Restricted access
    - Admin commands: Admins, Owners, VIPs
    - Owner commands: Owners only

╚══════════════════════════════════════╝`,
        ...hiddenChannelInfo
    });
}

module.exports = helpCommand;