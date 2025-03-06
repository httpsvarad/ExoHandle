const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.sendNotification = async (req, res)=> {
    try {
        const { message, semesterId, type } = req.body;

        if (!message || !semesterId || !type) {
            return res.status(400).json({ error: 'Message, semesterId and type are required.' });
        }

        // Get all students in the semester
        const studentSemesters = await prisma.studentSemester.findMany({
            where: { semesterId: parseInt(semesterId) },
            select: { studentId: true }
        });

        if (!studentSemesters.length) {
            return res.status(404).json({ error: 'No students found in the specified semester.' });
        }

        // Create notifications for each student
        const notifications = await prisma.notification.createMany({
            data: studentSemesters.map(student => ({
                userId: student.studentId,
                type,
                message
            }))
        });

        res.status(201).json({ 
            message: 'Notifications sent successfully',
            count: notifications.count
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send notifications' });
    }
}

exports.getNotification = async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10);


        if (!userId) {
            return res.status(400).json({ error: 'UserId is required.' });
        }

        const notifications = await prisma.notification.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

exports.readNotification = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Notification ID is required.' });
        }

        const notification = await prisma.notification.update({
            where: { id: id },
            data: { read: true }
        });

        res.status(200).json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to mark notification as read' });
    }
};

exports.unreadNotification = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Notification ID is required.' });
        }

        const notification = await prisma.notification.update({
            where: { id: id },
            data: { read: false }
        });

        res.status(200).json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to mark notification as unread' });
    }
};

