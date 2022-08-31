import React from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import getNewReleases from '../../../services/getNewReleases';
import getFeaturedReleases from '../../../services/getFeaturedReleases';
import getCategories from '../../../services/getCategories';
import useServices from '../../../hooks/useServices';
import '../styles/_discover.scss';

export default function Discover() {
  const [newReleases, loadingNewReleases] = useServices(getNewReleases)
  const [playlists, loadingPlaylists] = useServices(getFeaturedReleases)
  const [categories, loadingCategories] = useServices(getCategories)

  return (
    <div className="discover">
      <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} loading={loadingNewReleases} />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} loading={loadingPlaylists} />
      <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" loading={loadingCategories} />
    </div>
  );
}
