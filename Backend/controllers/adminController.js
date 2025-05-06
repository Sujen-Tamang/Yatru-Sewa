import { User } from "../models/userModel.js";
import Bus from "../models/Bus.js";
import Booking from "../models/Booking.js";
import mongoose from "mongoose";

export const getAdminDashboard = async (req, res) => {
    try {
        // Fetch total users
        const totalUsers = await User.countDocuments();

        // Fetch total active buses
        const activeBuses = await Bus.countDocuments({ status: "active" });

        // Fetch today's bookings
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const bookingsToday = await Booking.countDocuments({ createdAt: { $gte: today } });

        // Calculate monthly revenue
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const revenueData = await Booking.aggregate([
            { $match: { createdAt: { $gte: startOfMonth } } },
            { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
        ]);
        const revenueMTD = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        // Fetch recent bookings
        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("userId", "name")
            .populate("busId", "route")
            .lean();

        const formattedBookings = recentBookings.map(booking => ({
            id: booking._id,
            user: booking.userId?.name || "Unknown",
            route: booking.busId?.route || "Unknown",
            date: booking.createdAt.toISOString().split("T")[0],
            status: booking.status,
            amount: `$${booking.amount.toFixed(2)}`
        }));

        // Fetch popular routes based on number of bookings
        const popularRoutesData = await Booking.aggregate([
            { $group: { _id: "$route", bookings: { $sum: 1 }, revenue: { $sum: "$amount" } } },
            { $sort: { bookings: -1 } },
            { $limit: 4 }
        ]);

        const popularRoutes = popularRoutesData.map(route => ({
            route: route._id,
            bookings: route.bookings,
            revenue: `$${route.revenue.toFixed(2)}`
        }));

        // Prepare stats
        const stats = [
            { name: "Total Users", value: totalUsers.toLocaleString(), icon: "users", change: "+12%" },
            { name: "Active Buses", value: activeBuses.toLocaleString(), icon: "bus", change: "+3%" },
            { name: "Bookings Today", value: bookingsToday.toLocaleString(), icon: "ticket", change: "+18%" },
            { name: "Revenue (MTD)", value: `$${revenueMTD.toFixed(2)}`, icon: "money", change: "+22%" },
        ];

        res.json({ stats, recentBookings: formattedBookings, popularRoutes });
    } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
        res.status(500).json({ message: "Error fetching admin dashboard data", error });
    }
};