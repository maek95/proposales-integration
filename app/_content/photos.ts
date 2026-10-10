import clubhouse from "./photos/clubhouse.jpg";
import hero from "./photos/hero.jpg";
import lakeGreen from "./photos/lake-green.jpg";

// Stock photos standing in until the club has its own. All free under the Unsplash licence,
// which needs no credit - the sources are kept here so they can be checked or swapped.
//
// In the repo rather than loaded from Unsplash: a static import is hashed by its content and
// cached as immutable, and gets a blurred placeholder for free - so a refresh doesn't show an
// empty grey box while the photo is fetched and resized again. Downloaded at 2400 px wide;
// next/image makes the smaller sizes.
export const photos = {
  /** Landing page. Matthew McBrayer: https://unsplash.com/photos/fZL3EN4aJUI */
  hero: {
    src: hero,
    alt: "A green with bunkers and a pond, pine trees and hills behind",
  },
  /** The club's intro. Nick Agee: https://unsplash.com/photos/VpIjuc6s6QE */
  lakeGreen: {
    src: lakeGreen,
    alt: "A green on the shore of a still lake, pine trees around it, in evening light",
  },
  /** The clubhouse. avansear: https://unsplash.com/photos/3NpJk7j20HY */
  clubhouse: {
    src: clubhouse,
    alt: "The clubhouse buildings above a green and a pond",
  },
};
