const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Card = require("../../models/Card");

// @route   GET api/cards
// @desc    Create a card
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("module", "Module is required").not().isEmpty(),
      check("question", "Question is required").not().isEmpty(),
      check("answer", "Answer is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newCard = new Card({
        question: req.body.question,
        answer: req.body.answer,
        module: req.body.module,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const card = await newCard.save();

      res.json(card);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/cards
// @desc    Get all cards
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const cards = await Card.find().sort({ date: -1 });
    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/cards/:id
// @desc    Get card by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ msg: "Card does not exist" });
    }

    res.json(card);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Card does not exist" });
    }
    res.status(500).send("Server Error");
  }
});

//TODO - Get card by user

// @route   DELETE api/cards/:id
// @desc    Delete a card
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ msg: "Card does not exist" });
    }

    // Check user
    if (card.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await card.remove();

    res.json({ msg: "Card removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Card does not exist" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/cards/comment/:id
// @desc    Commment on a card
// @access  Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const card = await Card.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      card.comments.unshift(newComment);

      await card.save();

      res.json(card.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    //Pull out comment
    const comment = card.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = card.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    card.comments.splice(removeIndex, 1);

    await card.save();

    res.json(card.comments); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
