var express     = require('express');
    router      = express.Router();
    Campground  = require('../models/campground');
    middleware  = require('../middleware');

router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err) console.log(err)
        else res.render("campgrounds/index",{campgrounds : allCampgrounds});
    })
});

router.post("/",middleware.isLoggedIn, function(req,res){
    var title = req.body.title;
    var price = req.body.price;
    var img = req.body.image;
    var description = req.body.description;
    var author  = {
        id : req.user._id,
        username : req.user.username
    }
    var newCampground = { title , price, img , description , author};
    Campground.create(newCampground,function(err,Campground){
        if(err) console.log(err);
        else res.redirect("/campgrounds")
    })
});

router.get("/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new.ejs");
});

router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err) console.log(err)
        else res.render("campgrounds/show",{ campground : foundCampground});
    });
})

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit",{campground : foundCampground}); 
    })
})

router.put("/:id",function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err) res.redirect("/campgrounds");
        else res.redirect("/campgrounds/"+req.params.id);
    })
})

router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        res.redirect("/campgrounds");
    })
})

module.exports = router;