// src/controllers/admin/adminDashboardController.js
import Bus from '../../models/Bus.js';
import Booking from '../../models/Booking.js';

// Helper function to calculate percentage change
const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
};

// GET /api/v1/admin/dashboard/stats
export const getDashboardStats = async (req, res) => {
    try {
        const now = new Date();
        const startOfToday = new Date(now.setHours(0, 0, 0, 0));
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        const totalUsers = await User.countDocuments();
        const lastMonthUsers = await User.countDocuments({
            createdAt: { $lte: endOfLastMonth },
        });
        const totalUsersChange = calculatePercentageChange(totalUsers, lastMonthUsers);

        const activeBuses = await Bus.countDocuments({ status: 'active' });
        const lastMonthActiveBuses = await Bus.countDocuments({
            status: 'active',
            updatedAt: { $lte: endOfLastMonth },
        });
        const activeBusesChange = calculatePercentageChange(activeBuses, lastMonthActiveBuses);

        const bookingsToday = await Booking.countDocuments({
            createdAt: { $gte: startOfToday },
        });
        const lastMonthBookingsToday = await Booking.countDocuments({
            createdAt: {
                $gte: new Date(startOfLastMonth.setHours(0, 0, 0, 0)),
                $lte: new Date(startOfLastMonth.setHours(23, 59, 59, 999)),
            },
        });
        const bookingsTodayChange = calculatePercentageChange(bookingsToday, lastMonthBookingsToday);

        const revenueMTDResult = await Booking.aggregate([
            { $match: { createdAt: { $gte: startOfMonth } } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);
        const revenueMTD = revenueMTDResult[0]?.total || 0;

        const lastMonthRevenueResult = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
                },
            },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);
        const lastMonthRevenue = lastMonthRevenueResult[0]?.total || 0;
        const revenueMTDChange = calculatePercentageChange(revenueMTD, lastMonthRevenue);

        const stats = {
            totalUsers,
            totalUsersChange,
            activeBuses,
            activeBusesChange,
            bookingsToday,
            bookingsTodayChange,
            revenueMTD,
            revenueMTDChange,
        };

        res.status(200).json({
            success: true,
            data: stats,
            message: 'Stats fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching dashboard stats',
        });
    }
};

// GET /api/v1/admin/dashboard/bookings/recent
export const getRecentBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .select('id customer route date status amount')
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();

        const formattedBookings = bookings.map((booking) => ({
            id: booking.id || booking._id.toString(),
            customer: booking.customer,
            route: booking.route,
            date: booking.date,
            status: booking.status,
            amount: booking.amount,
        }));

        res.status(200).json({
            success: true,
            data: formattedBookings,
            message: 'Recent bookings fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching recent bookings:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching recent bookings',
        });
    }
};

// GET /api/v1/admin/dashboard/routes/popular
export const getPopularRoutes = async (req, res) => {
    try {
        const routes = await Booking.aggregate([
            { $group: { _id: '$route', revenue: { $sum: '$amount' } } },
            { $sort: { revenue: -1 } },
            { $limit: 4 },
            { $project: { route: '$_id', revenue: 1, _id: 0 } },
        ]);

        res.status(200).json({
            success: true,
            data: routes,
            message: 'Popular routes fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching popular routes:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching popular routes',
        });
    }
};