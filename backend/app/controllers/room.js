import Room from "../models/Room.js";
export const createRoom = async (req, res) => {
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        res.status(200).json(savedRoom);
        console.log(">>Create new room success!")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateRoom = async (req, res) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{ $set: req.body },
      );
      res.status(200).json(updatedRoom);
      console.log('>>Update room success')
    } catch (err) {
      next(err);
    }
  };

  export const deleteRoom = async (req, res) => {
    try {
      await Room.findByIdAndDelete(req.params.id);
      res.status(200).json("Room has been deleted.");
      console.log('>>Room has been deleted!')
      } catch (err) {
        next(err);
      }

  };
  export const getRoom = async (req, res, next) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
      console.log('>> Get room '+room.roomNumber+ ' success!')
    } catch (err) {
      next(err);
    }
  };
  export const getRooms = async (req, res, next) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
      console.log('>> Get all rooms success!')
    } catch (err) {
      next(err);
    }
  };