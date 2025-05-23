export default function ImageTile() {
    return (<div className="nav-tile nav-tile-7">
        <a id="tileimagery" href="/contact" className="tile imagery w-inline-block"
        ><div className="tile-title">Imagery</div>
            <div className="imagery-visual-container">
                <div className="imagery-visual-square">
                    <div className="imagery-visual-picture">
                        <div className="imagery-visual-picture-embed w-embed w-script">
                            <svg className="hills" viewBox="0 0 250 150" fill="none">
                                <defs>
                                    <path
                                        id="imagery-hills-path"
                                        d="M39 64.6059C16.4306 64.6059 0 83.8921 0 83.8921V150H250V34.2917C250 34.2917 229 0 202.602 0C155 0 136.444 87.8921 100 87.8921C77 87.8921 64 64.6059 39 64.6059Z"
                                    />
                                    <clipPath id="imagery-hills-clip">
                                        <use xlinkHref="#imagery-hills-path" />
                                    </clipPath>

                                </defs>
                                <g>
                                    <use
                                        xlinkHref="#imagery-hills-path"
                                        strokeWidth="4px"
                                        clipPath="url(#imagery-hills-clip)"
                                    />
                                </g>

                            </svg>

                            <div className="sunandmoon">
                                <svg className="sunmoon sun" viewBox="-2 -2 44 44">
                                    <defs>
                                        <circle
                                            id="imagery-sun-path"
                                            cx="20"
                                            cy="20"
                                            r="20"
                                        />
                                        <clipPath id="imagery-sun-clip">
                                            <use xlinkHref="#imagery-sun-path" />
                                        </clipPath>
                                    </defs>
                                    <g>
                                        <use
                                            xlinkHref="#imagery-sun-path"
                                            strokeWidth="4px"
                                            clipPath="url(#imagery-sun-clip)"
                                        />
                                    </g>
                                </svg>
                                <svg className="sunmoon moon" viewBox="-2 -2 44 44">
                                    <defs>
                                        <path
                                            id="imagery-moon-path"
                                            d="M37.789 27.8581C37.789 27.8581 25.4475 32.7572 15.6202 22.5197C5.79294 12.2821 11.3735 0.765137 11.3735 0.765137C9.44381 1.70298 7.6356 2.97261 6.03402 4.57419C-1.71664 12.3248 -1.69319 24.9146 6.08638 32.6942C13.866 40.4737 26.4557 40.4972 34.2064 32.7465C35.6825 31.2704 36.8767 29.6187 37.789 27.8581Z"
                                        />
                                        <clipPath id="imagery-moon-clip">
                                            <use xlinkHref="#imagery-moon-path" />
                                        </clipPath>
                                    </defs>
                                    <g>
                                        <use
                                            xlinkHref="#imagery-moon-path"
                                            strokeWidth="4px"
                                            clipPath="url(#imagery-moon-clip)"
                                        />
                                    </g>
                                </svg>
                            </div>




                        </div>
                        <div className="imagery-visual-picture-border"></div>
                    </div>
                </div></div
            ></a>
    </div>)
}