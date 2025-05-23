export default function MotionTile() {
    return (<div className="nav-tile nav-tile-8">
        <a id="tilemotion" href="/contact" className="tile motion w-inline-block"
        ><div className="tile-title">Motion</div>
            <div className="motion-visual-container">
                <div className="w-embed">
                    <div className="bezier-tangent tangent-1"></div>
                    <div className="bezier-tangent tangent-2"></div>
                    <svg
                        className="bezier-point point-1"
                        width="20"
                        height="20"
                        viewBox="-2 -2 20 20"
                    >
                        <path
                            d="M0 8C0 5.19974 0 3.79961 0.544967 2.73005C1.02433 1.78924 1.78924 1.02433 2.73005 0.544967C3.79961 0 5.19974 0 8 0C10.8003 0 12.2004 0 13.27 0.544967C14.2108 1.02433 14.9757 1.78924 15.455 2.73005C16 3.79961 16 5.19974 16 8C16 10.8003 16 12.2004 15.455 13.27C14.9757 14.2108 14.2108 14.9757 13.27 15.455C12.2004 16 10.8003 16 8 16C5.19974 16 3.79961 16 2.73005 15.455C1.78924 14.9757 1.02433 14.2108 0.544967 13.27C0 12.2004 0 10.8003 0 8Z"
                        />
                    </svg>
                    <svg
                        className="bezier-point point-2"
                        width="20"
                        height="20"
                        viewBox="-2 -2 20 20"
                    >
                        <path
                            d="M0 8C0 5.19974 0 3.79961 0.544967 2.73005C1.02433 1.78924 1.78924 1.02433 2.73005 0.544967C3.79961 0 5.19974 0 8 0C10.8003 0 12.2004 0 13.27 0.544967C14.2108 1.02433 14.9757 1.78924 15.455 2.73005C16 3.79961 16 5.19974 16 8C16 10.8003 16 12.2004 15.455 13.27C14.9757 14.2108 14.2108 14.9757 13.27 15.455C12.2004 16 10.8003 16 8 16C5.19974 16 3.79961 16 2.73005 15.455C1.78924 14.9757 1.02433 14.2108 0.544967 13.27C0 12.2004 0 10.8003 0 8Z"
                        />
                    </svg>
                    <svg
                        className="bezier-point point-3"
                        width="20"
                        height="20"
                        viewBox="-2 -2 20 20"
                    >
                        <path
                            d="M0 8C0 5.19974 0 3.79961 0.544967 2.73005C1.02433 1.78924 1.78924 1.02433 2.73005 0.544967C3.79961 0 5.19974 0 8 0C10.8003 0 12.2004 0 13.27 0.544967C14.2108 1.02433 14.9757 1.78924 15.455 2.73005C16 3.79961 16 5.19974 16 8C16 10.8003 16 12.2004 15.455 13.27C14.9757 14.2108 14.2108 14.9757 13.27 15.455C12.2004 16 10.8003 16 8 16C5.19974 16 3.79961 16 2.73005 15.455C1.78924 14.9757 1.02433 14.2108 0.544967 13.27C0 12.2004 0 10.8003 0 8Z"
                        />
                    </svg>
                    <svg
                        className="bezier-point point-4"
                        width="20"
                        height="20"
                        viewBox="-2 -2 20 20"
                    >
                        <path
                            d="M0 8C0 5.19974 0 3.79961 0.544967 2.73005C1.02433 1.78924 1.78924 1.02433 2.73005 0.544967C3.79961 0 5.19974 0 8 0C10.8003 0 12.2004 0 13.27 0.544967C14.2108 1.02433 14.9757 1.78924 15.455 2.73005C16 3.79961 16 5.19974 16 8C16 10.8003 16 12.2004 15.455 13.27C14.9757 14.2108 14.2108 14.9757 13.27 15.455C12.2004 16 10.8003 16 8 16C5.19974 16 3.79961 16 2.73005 15.455C1.78924 14.9757 1.02433 14.2108 0.544967 13.27C0 12.2004 0 10.8003 0 8Z"
                        />
                    </svg>


                </div>
                <div className="motion-bezier-container">
                    <div className="motion-bezier-container-embed w-embed">
                        <svg
                            className="motion-bezier-path"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            <path d="M 0,75 C 30,75 60,25 100,25">
                                <animate
                                    attributeName="d"
                                    dur="0.35s"
                                    fill="freeze"
                                    keyTimes="0; 1"
                                    keySplines=".4 0 .2 1"
                                    calcMode="spline"
                                    to="M 0,75 C 65,75 35,25 100,25"
                                    begin="tilemotion.mouseover"
                                />
                                <animate
                                    attributeName="d"
                                    dur="0.35s"
                                    fill="freeze"
                                    keyTimes="0; 1"
                                    keySplines=".4 0 .2 1"
                                    calcMode="spline"
                                    to="M 0,75 C 30,75 60,25 100,25"
                                    begin="tilemotion.mouseout"
                                />
                            </path>
                        </svg>


                    </div>
                </div>
            </div></a>
    </div>)
}