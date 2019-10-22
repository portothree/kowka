
'use strict'


// Inject some data to HTML code.

module.exports = {

	build: 3,
	name: 'inject:data',

	run ( done ) {

		if ( this.isDev ) return done()

		const files = this.paths.views( '*.html' )

		return this.gulp.src( files )
			.pipe( this.plumber() )
			.pipe( this.inject() )
			.pipe( this.pretty() )
			.pipe( this.dest() )

	},

	dest () {
		return this.gulp.dest( this.paths._views )
	},

	inject () {

		const inject = require( this.paths.core( 'inject' ) )

		return this.pipe( inject, this, 'FinalInjects' )

	},

	pretty () {

		if ( !this.config.HTMLBeautify ) return this.pipe()

		const prettyHTML = require( this.paths.core( 'prettyHTML' ) )

		return this.pipe( prettyHTML, this, 'prettyHTML' )

	},

}

