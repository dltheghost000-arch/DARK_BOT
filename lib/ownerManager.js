const fs = require('fs');
const path = require('path');

const ownersFile = path.join(__dirname, '../data/owners.json');

function ensureFile() {
    if (!fs.existsSync(ownersFile)) {
        fs.writeFileSync(ownersFile, JSON.stringify({ owners: [], vips: [] }, null, 2));
    }
}

function loadData() {
    ensureFile();
    try {
        const data = JSON.parse(fs.readFileSync(ownersFile, 'utf-8'));
        return {
            owners: data.owners || [],
            vips: data.vips || []
        };
    } catch (e) {
        return { owners: [], vips: [] };
    }
}

function saveData(owners, vips) {
    fs.writeFileSync(ownersFile, JSON.stringify({ owners, vips }, null, 2));
}

async function isOwner(senderId) {
    const { owners } = loadData();
    return owners.includes(senderId);
}

async function isVip(senderId) {
    const { vips } = loadData();
    return vips.includes(senderId);
}

async function isOwnerOrVip(senderId) {
    const { owners, vips } = loadData();
    return owners.includes(senderId) || vips.includes(senderId);
}

async function addOwner(senderId) {
    const { owners, vips } = loadData();
    if (!owners.includes(senderId)) {
        owners.push(senderId);
        saveData(owners, vips);
        return true;
    }
    return false;
}

async function removeOwner(senderId) {
    const { owners, vips } = loadData();
    const index = owners.indexOf(senderId);
    if (index !== -1) {
        owners.splice(index, 1);
        saveData(owners, vips);
        return true;
    }
    return false;
}

async function addVip(senderId) {
    const { owners, vips } = loadData();
    if (!vips.includes(senderId) && !owners.includes(senderId)) {
        vips.push(senderId);
        saveData(owners, vips);
        return true;
    }
    return false;
}

async function removeVip(senderId) {
    const { owners, vips } = loadData();
    const index = vips.indexOf(senderId);
    if (index !== -1) {
        vips.splice(index, 1);
        saveData(owners, vips);
        return true;
    }
    return false;
}

async function listOwners() {
    const { owners, vips } = loadData();
    return { owners, vips };
}

module.exports = {
    isOwner,
    isVip,
    isOwnerOrVip,
    addOwner,
    removeOwner,
    addVip,
    removeVip,
    listOwners
};