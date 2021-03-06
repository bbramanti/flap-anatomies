// Run the function passed in when the page fully loads. This ensures that all appropriate markup is in place.

$(document).ready(function(){

    // Get the wrapper HTML element for the flap anatomy and store it in $wrapper
    var $wrapper = $('.flip-up-wrapper');

    // Configure the wrapper based off our flap configuration. This sets the width, height,
    // and background image to the appropriate configuration values.
    $wrapper.css({
        'width': FlapConfiguration.background.width,
        'height': FlapConfiguration.background.height,
        'background-image': 'url(' + FlapConfiguration['base-url'] + '/' + FlapConfiguration.background.path + ')',
        'perspective:': FlapConfiguration.background.width
    });

    // Flap Configuration is loaded in as a window variable from another file.
    var flipDir = FlapConfiguration['flip-dir'];
    var baseUrl = FlapConfiguration['base-url'];

    // This is the general flip direction for the entire diagram.
    $wrapper.addClass('flip-dir-' + flipDir);

    // Clear out any HTML currently in the target .flip-up element. This ensures we start
    // with a clean slate.
    $wrapper.find('.flip-up').empty();

    // Mustache is a template system that allows you to specify dynamic markup within HTML.
    // You can find the template referred to here by searching in FlapAnatomy.htm for component-markup.
    // Component template is used to create each flap.
    var componentTemplate = $('#component-markup').html();

    // This index is used in generating the mustache flap templates.
    var idx=1;
    // Loop over each component within our configuration file
    for(var flap in FlapConfiguration.components) {
        var component = FlapConfiguration.components[flap];
        // Create the HTML markup for this component.
        var $markup = $(Mustache.render(componentTemplate, {'baseUrl': baseUrl, 'idx': idx, 'component': component, 'flipDir': flipDir}));

        // Apply custom CSS specific to this component. It's necessary to ensure proper positioning
        // and scaling of the components.
        $markup.css({
            top: component.y + '%',
            left: component.x + '%',
            height: component.h + '%',
            maxHeight: component.h + '%',
            width: component.w + '%'
        })
        // Configure the first flap as the 'active' flap. That is, the one that will receive clicks
        .toggleClass('active', idx==1)
        .data('desc', component.desc);

        // Append the generated markup to the .flip-up div
        $wrapper.find('.flip-up').append($markup);

        idx++;
    };

    // The last component is just an empty Mustache template that doesn't have any images.
    // The last component is part of the background image.
    $lastComponent = Mustache.render(componentTemplate, {'idx': idx});

    // Flip-up is nested in flip-up-wrapper and contains all the components.
    $wrapper.find('.flip-up').append($lastComponent);

    // This index is used in the Component function
	  var index = 0;

    // currentActive indicates the index of the currently active flap
		currentActive = 0;

    // This is an array of flap objects
		components = [];

    // use retButton to verify where the autoFlip call is coming from
    // Helps control when sidebar descriptions are seen
    var retButton = false;

    // Clicked is the index of the flap you want to navigate to, 
    // active is the index of the current flap.
    // The 'up' and 'down' directions indicate the direction you are moving through
    // the sequence. Flipping 'up' means that you are going forward. Flipping 'down' means that you
    // are going backwards.
    // The for loops are somehow essential for the sidebar nav indicators to work
    function autoFlip(clicked, active) {
        if (clicked > active){
            //flip up
            for (var i = active; i < clicked; i++) {
                updateCurrentActive('up', 0);
            }

        } else if (clicked < active) {
            //flip down
            for (var i = active; i > clicked; i--) {
                updateCurrentActive('down', 0);
            }
        }
    }

    // depending on id, call autoFlip with different parameter
    function clickIndicator(id){
        var id = id.slice(2);
        console.log("indicator clicked: " + id);

        if (id == "zero"){
            autoFlip(0,currentActive);
        }
        if (id == "one"){
            autoFlip(1,currentActive);
        }
        if (id == "two"){
            autoFlip(2,currentActive);
        }
        if (id == "three"){
            autoFlip(3,currentActive);
        }
        if (id == "four"){
            autoFlip(4,currentActive);
        }
        if (id == "five"){
            autoFlip(5,currentActive);
        }
        if (id == "six"){
            autoFlip(6,currentActive);
        }
        if (id == "seven"){
            autoFlip(7,currentActive);
        }
        if (id == "eight"){
            autoFlip(8,currentActive);
        }
        if (id == "nine"){
            autoFlip(9,currentActive);
        }
        if (id == "ten"){
            autoFlip(10,currentActive);
        }
    }

    // add onclick functions to each indicator
    $("#i_zero").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_one").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_two").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_three").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_four").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_five").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_six").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_seven").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_eight").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_nine").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_ten").on( "click", function() {
        clickIndicator(this.id);
    });


    // Create a new pseudo-class to represent a component. This will allow for better handling
    // of click events in a structured way.
    var Component = function( elem , figure ){
		    this.index = index;
		    this.self = $( '#' + elem );
		    this.back = this.self.find( '.flip-up-back' );
		    this.initHeight = this.self.height();

        // Configure the click event on the component object. On click, this first checks to see
        // if the component has the 'active' class. If so, and it's not the last component in
        // the list, we flip the component up and displays the components beneath it
        // (showing the back side of this component).
        // If it is the last component, it sets the active state to 'last'.
        //
        // If the component isn't active, then we assume we're flipping the component back down to
        // reveal its front.

		    this.self.click( function(){
    			  if ($(this).hasClass('active')){
    			      if( $(this).hasClass('last') && ($(this).height() == 0 || $(this).width() == 0)){
    					      updateCurrentActive('last', figure );
    				    } else {
    					      updateCurrentActive('up', figure );
    				    }
    			  }
    			  if ($(this).hasClass('previous')){
                updateCurrentActive('down', figure);
            }
        });
        
        index++;
    }

  	var i = 1;
    // Initialize the component list, creating the pseudo-class described above for
    // each component found
  	while( $('.component-' + i).length){
  	     var component = new Component( 'component-' + i );
         components.push(component);
  		   i++;
  	}

    // Helper method for configuring the current active state. currentActive is just maintaining
    // the index of the currently-active component
  	function updateCurrentActive (direction, timeout){
        component = components[currentActive];

        // Users can click on a flap, while the indicators are hidden. The indicators are a proxy
        // for whether user is on the start menu or not. This conditional also accounts for
        // a user pressing the return button and that button's onclick method eventually calls
        // this method, while the indicators are hidden but the retButton value is true.

        // If the indicators are hidden and the retButton hasn't been selected, then remove the
        // start menu and add the description panels.
        // If retButton is true we do not want to to execute this code because it has already been done.
        if (($("#indicators").hasClass('hidden section') == true) && retButton == false){
            // hide startup screen
            $("#startup").addClass("hidden section");
            // show flap information and indicators
            $("#panel-text").removeClass("hidden section");
            $("#indicators").removeClass("hidden section");
            // show the return button
            $("#return").removeClass("hidden section");
        }
        // Call the autoDrag function, which triggers the transition for lifting up
        // or dragging down the component
        autoDrag(component, direction, timeout);
        // Update currentActive index following the animation.
        if (direction == 'up' && currentActive < components.length-1){
            currentActive++;
            changeDescription();
        } else if (direction == 'down'){
            currentActive--;
            changeDescription();
        }
  	}

    /*In order to simulate the drag functionality, the flap anatomy makes use of CSS transitions,
      like shown in the 'ANIMATION' section on the 'main.css' file.

      For a bit more info on CSS transitions, you can read the W3C article here: https://www.w3schools.com/css/css3_transitions.asp
      Essentially, we set up the CSS transitions to invert the images, flipping them vertically or horizontally.

      The flipping animation is implemented by using a class name to signal a change in states which then
      triggers CSS transitions. This method is reversed when you click on the back of the flap to reveal the flap itself.
    */
  	function autoDrag (component, direction, timeout){
        // if timeout is 0 then this function is getting called from autoFlip
        // in this case we will not use any timeouts
        if ((timeout == 0) && (direction=="up")) {
          // Triggers when user moves forward through the diagram using the indicators
            component.self.addClass('flipped');
            component.self.removeClass('active').css('z-index', 1000);
            if(component.self.next('.flip-up-component-wrapper')[0]){
                $('.previous').removeClass('previous');
                component.self.addClass('previous');
                component.self.next('.flip-up-component-wrapper').addClass('active');
            }
        }
        if ((timeout == 0) && (direction=="down")) {
            // Triggers when user moves backward through the diagram using the indicators
            // prevComponent refers to the next flap closest to the top of the diagram,
            // not necessarily the last active flap.
            var prevComponent;
            prevComponent = components[component.index - 1];
            $('.active').removeClass('active');
            $('.previous').removeClass('previous').removeClass('flipped').addClass('active');

            prevComponent.self.prev('.flip-up-component-wrapper').addClass('previous');
            prevComponent.self.css('z-index', '');
        }
        if((timeout != 0) && (direction == 'up')){
            // Triggers when user moves forward through the diagram by clicking on a flap
            component.self.addClass('flipped');
  			    component.self.removeClass('active').css('z-index', 1000 );
            console.log(component.self);
            if( component.self.next ('.flip-up-component-wrapper')[0] ){
  				      setTimeout (function(){
                    $('.previous').removeClass('previous');
    			          component.self.addClass('previous');
    			          component.self.next('.flip-up-component-wrapper').addClass('active');
                }, timeout||500);
            }
        } else if ((timeout != 0) && (direction == 'down')){
            // Triggers when user moves backward through the diagram by clicking on a flap
            var prevComponent;
            prevComponent = components[component.index - 1];
            $('.active').removeClass('active');
            $('.previous').removeClass('previous').removeClass('flipped').addClass('active');

  			    prevComponent.self.prev('.flip-up-component-wrapper').addClass('previous');
  			    prevComponent.self.css('z-index', '');
  		  } else if (direction == 'last'){
            // It's unclear when this is used
  		      component.self.prev('.flip-up-component-wrapper').addClass('previous');
  		  }
  	}

    // ".flap-info" refers to the sidebar
    $(".flap-info").css({'height': FlapConfiguration.background.height});

    // when the start button is clicked execute this code
    $("#start").on("click", function() {
        // hide startup elements
        $("#startup").addClass("hidden section");
        // show flap information and indicators
        $("#panel-text").removeClass("hidden section");
        $("#indicators").removeClass("hidden section");
        // show the return button
        $("#return").removeClass("hidden section");
        // fill in flap information
        changeDescription();
    });

    // when the return button is clicked execute this code
    $("#return-button").on( "click", function() {
        // hide indicators/panel-text/return-button
        retButton = true;
        $("#panel-text").addClass("hidden section");
        $("#indicators").addClass("hidden section");
        $("#return").addClass("hidden section");
        // show the startup information, reset flaps
        $("#startup").removeClass("hidden section");
        autoFlip(0,currentActive);
        retButton = false;
    });

    // Remove yellow "active" color from indicators when not active
    function removeIndicators(num){
        if (num != 0){
            $("#i_zero").css('color', '');
        }
        if (num != 1){
            $("#i_one").css('color', '');
        }
        if (num != 2){
            $("#i_two").css('color', '');
        }
        if (num != 3){
            $("#i_three").css('color', '');
        }
        if (num != 4){
            $("#i_four").css('color', '');
        }
        if (num != 5){
            $("#i_five").css('color', '');
        }
        if (num != 6){
            $("#i_six").css('color', '');
        }
        if (num != 7){
            $("#i_seven").css('color', '');
        }
        if (num != 8){
            $("#i_eight").css('color', '');
        }
        if (num != 9){
            $("#i_nine").css('color', '');
        }
        if (num != 10){
            $("#i_ten").css('color', '');
        }
    }

    // dynamically change text in description, depends completely on which spread is being viewed
    function changeDescription() {
        var selector = components[currentActive].index;
        // we have 5 flaps, bottom layer=6 so it gets custom text
        var customText = "Last Flap";
        if (selector != 6){
            $( "#custom-description" ).html(components[currentActive].self.data('desc'));
        } else {
            $( "#custom-description" ).html(customText);
        }

        if (selector == 0){
            $("#zero").removeClass("hidden");
            $("#one").addClass("hidden");
            $("#i_zero").css('color', 'yellow');
            removeIndicators(0);
        }
        if (selector == 1){
            $("#one").removeClass("hidden");
            $("#zero").addClass("hidden");
            $("#two").addClass("hidden");
            $("#i_one").css('color', 'yellow');
            removeIndicators(1);
        }
        if (selector == 2){
            $("#two").removeClass("hidden");
            $("#one").addClass("hidden");
            $("#three").addClass("hidden");
            $("#i_two").css('color', 'yellow');
            removeIndicators(2);
        }
        if (selector == 3){
            $("#three").removeClass("hidden");
            $("#two").addClass("hidden");
            $("#four").addClass("hidden");
            $("#i_three").css('color', 'yellow');
            removeIndicators(3);
        }
        if (selector == 4){
            $("#four").removeClass("hidden");
            $("#three").addClass("hidden");
            $("#five").addClass("hidden");
            $("#i_four").css('color', 'yellow');
            removeIndicators(4);
        }
        if (selector == 5){
            $("#five").removeClass("hidden");
            $("#four").addClass("hidden");
            $("#six").addClass("hidden");
            $("#i_five").css('color', 'yellow');
            removeIndicators(5);
        }
        if (selector == 6){
            $("#six").removeClass("hidden");
            $("#five").addClass("hidden");
            $("#seven").addClass("hidden");
            $("#i_six").css('color', 'yellow');
            removeIndicators(6);
        }
        if (selector == 7){
            $("#seven").removeClass("hidden");
            $("#six").addClass("hidden");
            $("#eight").addClass("hidden");
            $("#i_seven").css('color', 'yellow');
            removeIndicators(7);
        }
        if (selector == 8){
            $("#eight").removeClass("hidden");
            $("#seven").addClass("hidden");
            $("#nine").addClass("hidden");
            $("#i_eight").css('color', 'yellow');
            removeIndicators(8);
        }
        if (selector == 9){
            $("#nine").removeClass("hidden");
            $("#eight").addClass("hidden");
            $("#i_nine").css('color', 'yellow');
            removeIndicators(9);
        }
        if (selector == 10){
            $("#eight").removeClass("hidden");
            $("#nine").addClass("hidden");
            $("#i_ten").css('color', 'yellow');
            removeIndicators(10);
        }
    }
});
