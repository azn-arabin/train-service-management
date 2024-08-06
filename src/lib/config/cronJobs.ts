import cron from "node-cron";
import moment from "moment";
import { Ticket } from "../../models/Ticket";

// Schedule a cron job to run at midnight every day
cron.schedule("0 0 * * *", async () => {
  try {
    const now = moment().startOf("day").toDate();

    // Find and delete tickets with a journeyDate in the past
    const result = await Ticket.deleteMany({ journeyDate: { $lt: now } });

    console.log(`Deleted ${result.deletedCount} expired tickets.`);
  } catch (error) {
    console.error("Error deleting expired tickets:", error);
  }
});
