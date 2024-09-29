import Router, { Router as RouterClass } from 'next/router';
import { useEffect } from 'react';

import { ym } from '../lib/ym';

export const useTrackRouteChange = ({
  tagID,
  verbose,
}: {
  tagID: number | null;
  verbose?: boolean;
}) => {
  const usingPagesDirectory = !!Router.router;

  useEffect(() => {
    const handleRouteChange = (url: URL | string): void => {
      if (verbose) console.log('[next-yandex-metrica] (verbose): Sending "hit"', url);

      ym(tagID, 'hit', url.toString());
    };

    if (usingPagesDirectory || process.env.NODE_ENV === 'test') {
      // TODO test this logic branch with urls starting with '?'
      RouterClass.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        RouterClass.events.off('routeChangeComplete', handleRouteChange);
      };
    } else {
      const handleAppRouterRouteChange = (url: Parameters<typeof history.pushState>[2]) => {
        if (url === undefined || url === null) return;
        if (typeof url === 'string' && url.startsWith('?')) {
          // If the url starts with '?' — the App Router will then replace it with the actual url relative to the origin (e.g. ?page=2 will become /category/accessories?page=2), resulting in two state replacements.
          // Yandex Metrica would understand URL starting with '?', but the duplication would be a problem anyway.
          if (verbose)
            console.log(
              '[next-yandex-metrica] (verbose): Skipping "hit" for url, reason: duplicate',
              url,
            );

          return;
        }

        handleRouteChange(url);
      };

      // Override history.pushState to detect route changes
      const originalPushState = history.pushState;
      history.pushState = function (...args) {
        const [, , url] = args;
        handleAppRouterRouteChange(url);
        originalPushState.apply(history, args);
      };

      // Override history.replaceState to detect route changes
      const originalReplaceState = history.replaceState;
      history.replaceState = function (...args) {
        const [, , url] = args;
        handleAppRouterRouteChange(url);
        originalReplaceState.apply(history, args);
      };

      return () => {
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
      };
    }
  }, [tagID, usingPagesDirectory, verbose]);
};
