import { connect } from 'react-redux';

function ManageTitles({ children }) {
  // Titles header
  // Toolbar - pagination
  // Search form toggled
  // Main display - list all by default - list results if filtering

  // Use this to centralise title observables
  // E.g. update data when title is updated/removed
  return (
    <div>
      {children}
    </div>
  );
}

export default connect()(ManageTitles);
