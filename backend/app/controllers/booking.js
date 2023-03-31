import Booking from "../models/Booking.js";
export const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save()
        res.status(200).json(savedBooking);
        console.log(">>Create new booking success!")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id,{ $set: req.body }  );
    res.status(200).json(updatedBooking);
    console.log('>>Update booking success')
  } catch (err) {
    next(err);
  }
};

export const cancelBooking = async (req, res) => {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(req.params.id,{bookingStatus: 0},  );
      res.status(200).json(updatedBooking);
      console.log('>>Cancel booking success')
    } catch (err) {
      next(err);
    }
  };

  export const deleteBooking = async (req, res) => {
    try {
      await Booking.findByIdAndDelete(req.params.id);
      res.status(200).json("Booking has been deleted.");
      console.log('>>Booking has been deleted!')
      } catch (err) {
        next(err);
      }

  };
  export const getBooking = async (req, res, next) => {
    try {
      const booking = await Booking.findById(req.params.id);
      res.status(200).json(booking);
      console.log('>> Get booking '+booking.bookingNumber+ ' success!')
    } catch (err) {
      next(err);
    }
  };

  export const getBookings = async (req, res, next) => {
    try {
      const bookings = await Booking.find();
      const list = await Promise.all(
        bookings.map((booking) => {
          return Booking.findById(booking._id);
        })
      );
      res.status(200).json(list)
      console.log('>> Get all bookings success!')
    } catch (err) {
      next(err);
    }
  };
  export const getBookingByUserID = async (req, res, next) => {
    try {
     const bookings = await Booking.find({userID:req.params.id})
      res.status(200).json(bookings);
      console.log('>> Get by query success!')
    } catch (err) {
      next(err);
    }
  };