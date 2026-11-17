/**
 * Blog posts. Each post is a list of blocks so the page can render consistent,
 * accessible typography without a Markdown pipeline.
 *
 * Every technical claim here comes from the jiya-mobile repository
 * (code and commit messages). Keep it that way when adding posts.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; lang: string; code: string; caption?: string }
  | { type: "note"; text: string; link?: { href: string; label: string } };

export type Post = {
  slug: string;
  title: string;
  summary: string;
  category: "Engineering" | "Design";
  date: string; // ISO
  readMinutes: number;
  author: string;
  cover: { src: string; alt: string };
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "paint-first-fetch-second",
    title: "Paint first, fetch second: how Jiya stays usable on a weak signal",
    summary:
      "Most of our riders open the app on mobile data, often between towns. Here is how the app shows something useful immediately, retries sensibly and saves your actions for later.",
    category: "Engineering",
    date: "2026-10-18",
    readMinutes: 7,
    author: "Jiya Engineering",
    cover: { src: "/images/road-mountains.webp", alt: "A road heading towards mountains, seen through a car windscreen" },
    body: [
      { type: "p", text: "A carpool app is used in the worst possible places for a network: at a bus stage, on the edge of town, halfway between Lilongwe and Blantyre. For a while, opening a trip you had already posted made the app hit the network every single time. On a flaky link that could mean a spinner, then up to four retry attempts, before anything appeared." },
      { type: "p", text: "We fixed that by flipping the order of operations. The app now paints what it already knows, then quietly asks the server for anything newer." },
      { type: "h2", text: "One primitive: cacheFirst" },
      { type: "p", text: "Reads go through a single helper. If there is a cached copy, it is parsed and returned straight away, with no network wait on the return path, so the screen renders within about 400 ms even offline. The network request is fired as a detached future, and fresh data is pushed back to the screen through a callback." },
      {
        type: "code",
        lang: "dart",
        caption: "lib/common/network/cache_first_fetcher.dart (trimmed)",
        code: `Future<T> cacheFirst<T>({
  required String path,
  required T Function(dynamic) parser,
  void Function(T fresh)? onUpdated,
  bool forceCache = false,
  bool skipCache = false,
  ...
}) async {
  if (!skipCache) {
    final cachedRaw = await cache.get(box, key);
    if (cachedRaw != null) {
      final cached = parser(cachedRaw);
      unawaited(_refreshInBackground(..., onUpdated: onUpdated));
      return cached; // paint now
    }
  }
  // Cache miss: the network is the only source, so wait for it.
  final response = await DioClient.instance.get(path, ...);
  await cache.set(box, key, response.data);
  return parser(response.data);
}`,
      },
      { type: "p", text: "The rules are deliberately simple. It only throws when there is no cache and the network fails. If a cached copy was shown, a later network failure is swallowed and the stale copy stays on screen, which beats an error page when you are trying to find your driver's details. Two escape hatches exist: forceCache never touches the network, and skipCache ignores the cache for reads where an old page would be wrong, like pagination." },
      { type: "p", text: "Seat counts change as people book, which is why the background refresh matters. Opening a trip shows the cached version instantly, and the seat count updates a moment later when the server answers. Editing a trip is the one place we stay fresh-only on purpose." },
      { type: "h2", text: "Retry less when there is a fallback" },
      { type: "p", text: "Our retry interceptor only retries requests that are safe to repeat (GET, PUT, DELETE, HEAD and OPTIONS) unless a call explicitly opts in. It retries timeouts, connection errors and server errors, never client errors, and backs off exponentially with jitter from a one-second base." },
      { type: "p", text: "The interesting part is the budget. Requests that have a cache behind them get one quick retry, not three. Burning several seconds on retries before showing a perfectly good cached copy was exactly the slow experience we were trying to remove." },
      { type: "h2", text: "Writes wait in a queue" },
      { type: "p", text: "Reads can fall back to a cache; writes cannot. When the device is offline, write requests are stored in a small Hive-backed queue with their method, path, body and headers. When connectivity returns, the queue replays them in the order they were made. Each request gets three attempts before it is dropped, and the attempt count is saved before each try so a crash mid-replay cannot loop forever." },
      { type: "h2", text: "Do not throw work away" },
      { type: "p", text: "One of the cheapest wins was not network code at all. Flutter's TabBarView disposes tabs that scroll off screen unless they opt in to being kept alive. Swiping between All, Offers and Requests on Home was discarding data we had just fetched and firing a fresh request on every swipe back. Adding AutomaticKeepAliveClientMixin to the five affected tabs fixed it." },
      { type: "h2", text: "Tests first" },
      { type: "p", text: "The cache change was written test-first: function-level tests that seed Hive and run against a fake HTTP server, plus model tests for the edge cases we found on the way. One example: a trip segment with zero distance used to produce an infinite seat price, and now falls back to the full-trip price. The suite was at 716 passing tests when it shipped." },
      { type: "note", text: "If you like this kind of problem, we’d like to hear from you.", link: { href: "/careers", label: "See careers at Jiya" } },
    ],
  },
  {
    slug: "live-tracking-polling",
    title: "Why live tracking polls every five seconds",
    summary:
      "We shipped live trip tracking on Firebase Realtime Database, then moved it to plain REST the same day. What we built, what changed and what we would tell another small team.",
    category: "Engineering",
    date: "2026-09-15",
    readMinutes: 5,
    author: "Jiya Engineering",
    cover: { src: "/images/road-golden.webp", alt: "Cars on a two-lane highway at sunset" },
    body: [
      { type: "p", text: "Live tracking answers the most anxious question in carpooling: where is my driver? Once a trip starts, the passenger can follow the car to the pickup point, and the driver can see the passengers they are collecting." },
      { type: "h2", text: "Version one: Realtime Database" },
      { type: "p", text: "The first version had both sides write GPS coordinates straight to Firebase Realtime Database under a path per trip, and read the other party's marker from it on a map. Location comes from geolocator's Android foreground-service stream, which keeps updates flowing while the app is in the background." },
      { type: "p", text: "Tracking is Android-only for now. Background location on Android needs a foreground-service notification and the background location permission, and iOS handles this differently, so every entry point and permission request is gated on the platform." },
      { type: "p", text: "When a trip starts, the backend sends a push notification. It carries a tracking deep link that opens the tracking screen for that trip directly, using the same two-segment deep link convention as the rest of the app." },
      { type: "h2", text: "Version two: REST and a five-second poll" },
      { type: "p", text: "Later that day we removed the Realtime Database dependency. The driver's location stream now posts each position to a live-tracking endpoint on our own backend, and the map screen asks for the latest locations every five seconds instead of subscribing to a database reference." },
      {
        type: "code",
        lang: "text",
        caption: "The shape of the flow",
        code: `driver  ── geolocator stream ──▶ POST /live-tracking/…/location
passenger ◀── every 5 s ──────── GET  /live-tracking/…/locations`,
      },
      { type: "p", text: "The change was small, five files in all. The app lost a dependency, trip locations now live in the same backend as the trip itself, and the tracking screen uses the same networking and authentication as every other screen." },
      { type: "h2", text: "Is polling good enough?" },
      { type: "p", text: "For a car approaching a pickup point, yes. A five-second interval is well within what a person needs to decide whether to walk out to the road, and a fixed interval is predictable on mobile data. The screen also tells the passenger exactly what is shared: their location goes to the driver only until pickup." },
      { type: "note", text: "Live tracking appears in the app once the backend marks the trip as started." },
    ],
  },
  {
    slug: "every-ride-is-a-ticket",
    title: "Every ride is a ticket",
    summary:
      "The design idea behind this year’s redesign of the Jiya app, and the small details that make an Android app feel calm: pressed states, layers, headings and tickets.",
    category: "Design",
    date: "2026-10-04",
    readMinutes: 4,
    author: "Jiya Design",
    cover: { src: "/images/hero-friends.webp", alt: "Three friends laughing together in a car" },
    body: [
      { type: "p", text: "A ride on Jiya has a start, an end, a time, a seat and a price. That is a ticket. Once we started drawing every ride as a ticket, a lot of design decisions made themselves." },
      { type: "h2", text: "One ticket everywhere" },
      { type: "p", text: "Home, Offers, Requests and Search now use the same ride ticket. The ticket widgets moved into a shared folder so every screen draws rides the same way, and press-and-hold on a Home ticket shares it. Names on a ticket are only shortened when they really do not fit." },
      { type: "h2", text: "Layers you can feel" },
      { type: "p", text: "Pages sit on a ground layer below the cards: warm sand in light mode, near-black in dark. Cards read as raised without needing heavy shadows or borders. Inbox, My rides and Alerts get a large, left-aligned title on the page colour, and pushed screens share one flat bar from the theme." },
      { type: "h2", text: "Feel" },
      { type: "ul", items: [
        "Buttons shrink slightly while pressed, unless animations are turned off.",
        "Lists stretch at their edges instead of stopping dead.",
        "Pages slide in and can be swiped back, and there are no ripples.",
        "Large headings are tracked tighter, so they read as headings.",
        "The bottom bar is tinted with the page colour and blurs what scrolls behind it.",
      ] },
      { type: "h2", text: "Small things that build trust" },
      { type: "p", text: "In November we changed how requests work. Before you ask for a ride, the app shows rides already heading your way, labelled either Goes all the way or Ends about N km before your drop-off. The driver’s number is shared once you book, not before. Map pickers now use the coordinates of places we know, rather than an open search, so a pin cannot quietly keep its old location under a new name." },
      { type: "note", text: "This website uses the same palette, type and ticket shape as the app." },
    ],
  },
];

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
