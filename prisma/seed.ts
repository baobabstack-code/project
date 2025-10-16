import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Helper function to read JSON files
    const readJsonFile = (filename: string) => {
        const filePath = path.join(process.cwd(), 'public', 'data', filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    };

    try {
        // Seed Blog data
        console.log('📝 Seeding blog posts...');
        const blogData = readJsonFile('blog.json');
        for (const blog of blogData.data) {
            await prisma.blog.upsert({
                where: { id: blog.id },
                update: {},
                create: {
                    id: blog.id,
                    title: blog.title,
                    content: blog.content,
                    author: blog.author,
                    categories: blog.categories,
                    featuredImage: blog.featuredImage,
                    publishedAt: new Date(blog.publishedAt),
                },
            });
        }

        // Seed Portfolio data
        console.log('💼 Seeding portfolio items...');
        const portfolioData = readJsonFile('portfolio.json');
        for (const item of portfolioData.data) {
            await prisma.portfolio.upsert({
                where: { id: item.id },
                update: {},
                create: {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    image: item.image,
                    link: item.link,
                    category: 'Web Development', // Default category
                    tags: ['React', 'Node.js'], // Default tags
                },
            });
        }

        // Seed Testimonials data
        console.log('💬 Seeding testimonials...');
        const testimonialsData = readJsonFile('testimonials.json');
        for (const testimonial of testimonialsData.data) {
            await prisma.testimonial.upsert({
                where: { id: testimonial.id },
                update: {},
                create: {
                    id: testimonial.id,
                    content: testimonial.content,
                    author: testimonial.author,
                    role: testimonial.role,
                    company: testimonial.company,
                    image: testimonial.image,
                    rating: testimonial.rating,
                    publishedAt: new Date(testimonial.publishedAt),
                },
            });
        }

        // Seed Podcasts data
        console.log('🎙️ Seeding podcasts...');
        const podcastsData = readJsonFile('podcasts.json');
        for (const podcast of podcastsData.data) {
            await prisma.podcast.upsert({
                where: { id: podcast.id },
                update: {},
                create: {
                    id: podcast.id,
                    title: podcast.title,
                    description: podcast.description,
                    audioUrl: podcast.audioUrl,
                    videoUrl: podcast.videoUrl,
                    duration: podcast.duration,
                    publishedAt: new Date(podcast.publishedAt),
                    imageUrl: podcast.imageUrl,
                    category: podcast.category,
                    likes: podcast.likes || 0,
                    host: podcast.host,
                    guest: podcast.guest,
                    type: podcast.type,
                },
            });
        }

        // Seed Team data
        console.log('👥 Seeding team members...');
        const teamData = readJsonFile('team.json');
        for (const member of teamData.data) {
            await prisma.team.upsert({
                where: { id: member.id },
                update: {},
                create: {
                    id: member.id,
                    name: member.name,
                    role: member.role,
                    image: member.image,
                    bio: member.bio,
                    social: member.social,
                },
            });
        }

        // Seed Services data
        console.log('🛠️ Seeding services...');
        const servicesData = readJsonFile('services.json');
        for (const service of servicesData.data) {
            await prisma.service.upsert({
                where: { id: service.id },
                update: {},
                create: {
                    id: service.id,
                    title: service.title,
                    description: service.description,
                    icon: service.icon,
                },
            });
        }

        // Seed Features data
        console.log('✨ Seeding features...');
        const featuresData = readJsonFile('features.json');
        for (const feature of featuresData.data) {
            await prisma.feature.upsert({
                where: { id: feature.id },
                update: {},
                create: {
                    id: feature.id,
                    title: feature.title,
                    description: feature.description,
                    icon: feature.icon,
                },
            });
        }

        // Seed Pricing data
        console.log('💰 Seeding pricing plans...');
        const pricingData = readJsonFile('pricing.json');
        for (const plan of pricingData.data) {
            await prisma.pricing.upsert({
                where: { id: plan.id },
                update: {},
                create: {
                    id: plan.id,
                    name: plan.name,
                    price: plan.price,
                    description: plan.description,
                    features: plan.features,
                    popular: plan.popular,
                },
            });
        }

        // Seed TechStack data
        console.log('⚡ Seeding tech stack...');
        const techStackData = readJsonFile('techstack.json');
        for (const tech of techStackData.data) {
            await prisma.techStack.upsert({
                where: { id: tech.id },
                update: {},
                create: {
                    id: tech.id,
                    name: tech.name,
                    category: 'Technology', // Default category
                    icon: tech.icon,
                },
            });
        }

        // Seed Stats data
        console.log('📊 Seeding stats...');
        const statsData = readJsonFile('stats.json');
        for (const stat of statsData.data) {
            await prisma.stats.upsert({
                where: { id: stat.id },
                update: {},
                create: {
                    id: stat.id,
                    label: stat.label,
                    value: stat.value,
                    icon: stat.icon,
                },
            });
        }

        // Seed Values data
        console.log('🎯 Seeding company values...');
        const valuesData = readJsonFile('values.json');
        for (const value of valuesData.data) {
            await prisma.values.upsert({
                where: { id: value.id },
                update: {},
                create: {
                    id: value.id,
                    title: value.title,
                    description: value.description,
                    icon: value.icon,
                },
            });
        }

        // Seed some initial contact info
        console.log('📞 Seeding contact info...');
        await prisma.contactInfo.upsert({
            where: { id: 1 },
            update: {},
            create: {
                id: 1,
                email: 'contact@baobabstack.com',
                phone: '+1 (555) 123-4567',
                address: '123 Tech Street, Innovation City, IC 12345',
            },
        });

        // Seed some mock subscribers
        console.log('📧 Seeding newsletter subscribers...');
        const mockSubscribers = [
            'john@example.com',
            'sarah@example.com',
            'mike@example.com',
        ];

        for (let i = 0; i < mockSubscribers.length; i++) {
            await prisma.subscriber.upsert({
                where: { email: mockSubscribers[i] },
                update: {},
                create: {
                    email: mockSubscribers[i],
                },
            });
        }

        console.log('✅ Database seeding completed successfully!');
    } catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });