import React from 'react';
import Relay from 'react-relay';

import Panel from '../../shared/Panel';
import Button from '../../shared/Button';
import PageHeader from '../../shared/PageHeader';
import PageWithContainer from '../../shared/PageWithContainer';

import Jobs from './jobs';
import SearchInput from './search-input';

class JobIndex extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object.isRequired,
    relay: React.PropTypes.object.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(initialProps) {
    super(initialProps);

    // Figure out if the default query
    const query = this.props.location.query.q !== undefined ? this.props.location.query.q : "queue=default state:scheduled";
    this.state = { query: query, searchInputValue: query };
  }

  componentWillReceiveProps(nextProps) {
    // When the `q` param in the URL changes, do a new search
    const query = nextProps.location.query.q;
    if (query !== undefined && this.state.query !== query){
      this.setState({ query: query, searchInputValue: query });
    }
  }

  render() {
    return (
      <PageWithContainer>
        <PageHeader>
          <PageHeader.Title>Jobs</PageHeader.Title>
        </PageHeader>

        <Panel className="mb4">
          <Panel.Section>
            <form onSubmit={this.handleFormSubmit} className="flex items-stretch">
              <SearchInput value={this.state.searchInputValue} onChange={this.handleSearchInputChange} />
              <Button outline={true} theme="default" className="ml3">Search</Button>
            </form>

            <div className="dark-gray mt1">
              You can further filter jobs using <code>state:scheduled</code> or <code>concurrency-group:custom-group</code>
            </div>
          </Panel.Section>
        </Panel>

        <Jobs
          query={this.state.query}
          organization={this.props.organization}
        />
      </PageWithContainer>
    );
  }

  handleSearchInputChange = (event) => {
    this.setState({ searchInputValue: event.target.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.context.router.push(`/organizations/${this.props.organization.slug}/jobs?q=${this.state.searchInputValue}`);
  };

  performSearch = (query) => {
    const searchQueryParams = searchQuery.parse(query, { keywords: SEARCH_KEYWORDS });
    const variables = { concurrency: { group: null }, states: null, agentQueryRules: null, hasSearchQuery: true };

    if (typeof (searchQueryParams) == 'string') {
      variables.agentQueryRules = searchQueryParams;
    } else if (searchQueryParams) {
      variables.agentQueryRules = searchQueryParams.text;
      variables.concurrency.group = searchQueryParams['concurrency-group'];

      // Ensure the states are all upper case since it's a GraphQL enum
      let states = searchQueryParams['state'];
      if(typeof (states) == 'array') {
        variables.states = states.map((state) => state.toUpperCase());
      } else {
        variables.states = states.toUpperCase();
      }
    }
  };
}

export default Relay.createContainer(JobIndex, {
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        name
        slug
        ${Jobs.getFragment('organization')}
      }
    `
  }
});
