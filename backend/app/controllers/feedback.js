import Feedback from "../models/Feedback.js";
export const createFeedback = async (req, res) => {
    const newFeedback = new Feedback(req.body)
    try {
        const savedFeedback = await newFeedback.save()
        res.status(200).json(savedFeedback);
        console.log(">>Create new feedback success!")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateFeedback = async (req, res) => {
    try {
      const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id,{ $set: req.body },
      );
      res.status(200).json(updatedFeedback);
      console.log('>>Update feedback success')
    } catch (err) {
      next(err);
    }
  };

  export const deleteFeedback = async (req, res) => {
    try {
      await Feedback.findByIdAndDelete(req.params.id);
      res.status(200).json("Feedback has been deleted.");
      console.log('>>Feedback has been deleted!')
      } catch (err) {
        next(err);
      }

  };
  
  export const getFeedback = async (req, res, next) => {
    try {
      const feedback = await Feedback.findById(req.params.id);
      res.status(200).json(feedback);
      console.log('>> Get feedback '+feedback.feedbackNumber+ ' success!')
    } catch (err) {
      next(err);
    }
  };

  export const getFeedbacks = async (req, res, next) => {
    try {
      const feedbacks = await Feedback.find({isDisplay:true});
      // const feedbacks = await Feedback.find();
      const list = await Promise.all(
        feedbacks.map((feedback) => {
          return Feedback.findById(feedback._id);
        })
      );
      res.status(200).json(list)
      console.log('>> Get display feedbacks success')
    } catch (err) {
      next(err);
    }
  };

  export const getAllFeedbacks = async (req, res, next) => {
    try {
      const feedbacks = await Feedback.find();
      // const feedbacks = await Feedback.find();
      const list = await Promise.all(
        feedbacks.map((feedback) => {
          return Feedback.findById(feedback._id);
        })
      );
      res.status(200).json(list)
      console.log('>> Get all feedbacks success')
    } catch (err) {
      next(err);
    }
  };