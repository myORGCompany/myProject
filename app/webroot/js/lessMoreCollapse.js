/*!
 * lessMoreCollapse jQuery plugin
 */

;(function ( $, window, document, undefined ) {
    
    // Create the defaults once
    var pluginName = 'lessMoreCollapse',
        defaults = {            
            offsetHeight : 100
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the 
        // contents of two or more objects, storing the 
        // result in the first object. The first object 
        // is generally empty because we don't want to alter 
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        this.autoHeight =  $(this.element).height();
        
        //init call
        this.init();
    }

    Plugin.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element 
        // and this.options
        var el = this.element;
        
        if(this.autoHeight > this.options.offsetHeight){
            $(el)
                .addClass('dolessmoreblock')
                .addClass('dlmcontract')
                .height(this.options.offsetHeight)
                .append('<a href="javascript:void(0)" class="lm-control no-hover-effect">Read More <i class="fa fa-chevron-down"></i></a>');
            
            this.lmControl(this.autoHeight);
        }
                
    };
    
    Plugin.prototype.lmControl = function(autoHeight){
        var el = this.element,
            lH = this.options.offsetHeight; 
        $(el).find('.lm-control').click(function(){
            console.log(this.value);
            if($(this).hasClass('lmcontract')){ //do less
                $(this)
                    .removeClass('lmcontract')
                    .html('Read More <i class="fa fa-chevron-down"></i>');
                $(el)
                    .animate({'height':lH}, 300)                    
                    .addClass('dlmcontract')
                    .removeClass('dlmexpand');
                
            }else{ //do more
                $(this)
                    .addClass('lmcontract')
                    .html('Read Less <i class="fa fa-chevron-up"></i>');
                
                $(el)
                    .animate({'height':autoHeight},300,function(){$(this).css({'height':'auto'})})                  
                    .addClass('dlmexpand')
                    .removeClass('dlmcontract');
            }           
        });
    }   

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );