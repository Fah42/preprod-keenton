/**
 * Created by TINO-DEV on 11/11/2014.
 */

(function($){

  var et_header_height, et_header_modifier, et_header_offset, et_primary_header_top;
  var etRecalculateOffset = true;

  function et_calculate_header_values() {
    debugger;
    var $top_header = $( '#top-header' ),
      secondary_nav_height = $top_header.length && $top_header.is( ':visible' ) ? $top_header.innerHeight() : 0,
      admin_bar_height     = $( '#wpadminbar' ).length ? $( '#wpadminbar' ).innerHeight() : 0;

    et_header_height      = $( '#main-header' ).innerHeight() + secondary_nav_height - 1,
      et_header_modifier    = et_header_height <= 90 ? et_header_height - 29 : et_header_height - 56,
      et_header_offset      = et_header_modifier + admin_bar_height;

    et_primary_header_top = secondary_nav_height + admin_bar_height;
  }

  function et_change_primary_nav_position() {
    var $body = $('body');

    if ( ! $body.hasClass( 'et_vertical_nav' ) && ( $body.hasClass( 'et_fixed_nav' ) ) ) {
      $('#main-header').css( 'top', et_primary_header_top );
    }
  }

  $(window).load(function(){

    var admin_bar_height = $( '#wpadminbar' ).length ? $( '#wpadminbar' ).innerHeight() : 0;

    $('#main-header').waypoint({
      offset: function() {
        return admin_bar_height;
      },
      handler : function( direction ) {
        if ( direction === 'down' ) {
          $('#main-header')
            .addClass( 'kt-fixed et-fixed-header' )
            .css('top', admin_bar_height);
        } else {
          $('#main-header')
            .removeClass( 'kt-fixed et-fixed-header' )
            .css('top', 'auto');
        }
      }
    });

  });

})(jQuery)