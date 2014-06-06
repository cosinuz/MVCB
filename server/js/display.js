var videoDisplayed = false;
$(document).ready(function () {
    $("#miniature").on("click", ".miniature-video", function () {

        var miniId = $(this).attr("id");
        var principalId = "";
        var newVideo;
        //retrieving the principal id if possible
        if ((typeof $(".principal-video") !== "undefined") &&
            (typeof $(".principal-video").attr("id") !== "undefined")) {
            principalId = $(".principal-video").attr("id").split("principalID")[0];
        }
        console.log("miniId : " + miniId);
        console.log("principalId : " + principalId);
        //if the given miniature video
        //is not already displayed
        if (miniId !== principalId) {
            $(".principal-video").remove();
            newVideo = $(this).clone();
            newVideo.attr("id", newVideo.attr("id") + "principalID");
            $("#principal").append(newVideo);
            //no animation effect if a video is already displayed
            if (!videoDisplayed) {
                //to emphasize the animate effect
                newVideo.css("width", "0px");
                newVideo.css("height", "0px");
                console.log(newVideo.attr("id"));
                $("#" + newVideo.attr("id")).animate({
                        "width": "+=400px",
                        "height": "+=400px"
                    },
                    "slow");
            }
            newVideo.attr("class", "principal-video");
            videoDisplayed = true;
        }
    });

    $("#principal").on("click", ".principal-video", function () {
        $(".principal-video").animate({
                "width": "-=400px",
                "height": "-=400px"
            },
            "slow",
            function () {
                $(this).remove();
            });
        videoDisplayed = false;
    });
    $("#home").on("mouseover", function () {
        $(this).css("font-weight", "Bold");
    });
    $("#home").on("mouseout", function () {
        $(this).css("font-weight", "normal");
    });
});
