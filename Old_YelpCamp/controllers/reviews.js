const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash('success', 'Successfully added review.');
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteReview = async (req, res) => {
  console.log('Deleting.....');
  const { id, reviewId } = req.params;
  // remove the reference to the review from the campground
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully removed review.');
  res.redirect(`/campgrounds/${id}`);
};
