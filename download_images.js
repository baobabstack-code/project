const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const teamMembers = [
  { name: 'john-smith', role: 'CEO' },
  { name: 'sarah-johnson', role: 'CTO' },
  { name: 'michael-chen', role: 'developer' },
  { name: 'emily-rodriguez', role: 'designer' },
  { name: 'david-wilson', role: 'devops' },
  { name: 'lisa-thompson', role: 'manager' },
];

const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // Replace with your Unsplash Access Key

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFileSync(filepath, buffer);
  console.log(`Downloaded ${filepath}`);
}

async function fetchImageForRole(role) {
  const response = await fetch(`https://api.unsplash.com/photos/random?query=${role}&client_id=${UNSPLASH_ACCESS_KEY}`);
  const data = await response.json();
  return data.urls.small;
}

async function downloadTeamImages() {
  for (const member of teamMembers) {
    try {
      const imageUrl = await fetchImageForRole(member.role);
      const filepath = path.join(__dirname, 'public', 'team', `${member.name}.jpg`);
      await downloadImage(imageUrl, filepath);
    } catch (error) {
      console.error(`Failed to download image for ${member.name}:`, error);
    }
  }
}

downloadTeamImages();

