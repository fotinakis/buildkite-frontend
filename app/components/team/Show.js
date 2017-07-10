import React from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay/classic';
import DocumentTitle from 'react-document-title';

import PageHeader from '../shared/PageHeader';
import Emojify from '../shared/Emojify';
import permissions from '../../lib/permissions';
import TabControl from '../shared/TabControl';
import TeamPrivacyConstants from '../../constants/TeamPrivacyConstants';

import Pipelines from './Pipelines';
import Members from './Members';

class TeamShow extends React.Component {
  static propTypes = {
    team: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      slug: PropTypes.string.isRequired,
      privacy: PropTypes.string.isRequired,
      members: PropTypes.shape({
        count: PropTypes.number
      }).isRequired,
      pipelines: PropTypes.shape({
        count: PropTypes.number
      }).isRequired,
      organization: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired
      }).isRequired,
      permissions: PropTypes.shape({
        teamUpdate: PropTypes.object.isRequired
      }).isRequired
    }),
    children: PropTypes.node.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    removing: false,
    selectedTab: 0
  };

  render() {
    // If the team doesn't exist, that means that it's just been deleted. And
    // since we require all the team to render this component, we'll just
    // short-circut the re-render when it's gone. This isn't great, maybe
    // there's a beter way?
    if (!this.props.team) {
      return null;
    }

    return (
      <DocumentTitle title={`${this.props.team.name} · ${this.props.team.organization.name} Team`}>
        <div>
          <PageHeader>
            <div className="flex items-center"><h1 className="h1 m0 p0 block"><Emojify text={this.props.team.name} /></h1>{this.renderPrivacyLabel()}{this.renderDefaultLabel()}</div>
            <PageHeader.Description><Emojify text={this.props.team.description || "No description"} /></PageHeader.Description>
          </PageHeader>

          {this.renderTabs()}

          {this.props.children}
        </div>
      </DocumentTitle>
    );
  }

  renderTabs() {
    const tabContent = permissions(this.props.team.permissions).collect(
      {
        always: true,
        render: (idx) => (
          <TabControl.Tab
            key={idx}
            to={`/organizations/${this.props.team.organization.slug}/teams/${this.props.team.slug}/members`}
            badge={this.props.team.members.count}
          >
            Members
          </TabControl.Tab>
        )
      },
      {
        always: true,
        render: (idx) => (
          <TabControl.Tab
            key={idx}
            to={`/organizations/${this.props.team.organization.slug}/teams/${this.props.team.slug}/pipelines`}
            badge={this.props.team.pipelines.count}
          >
            Pipelines
          </TabControl.Tab>
        )
      },
      {
        allowed: "teamUpdate",
        render: (idx) => (
          <TabControl.Tab
            key={idx}
            to={`/organizations/${this.props.team.organization.slug}/teams/${this.props.team.slug}/settings`}
          >
            Settings
          </TabControl.Tab>
        )
      }
    );

    return (
      <TabControl>
        {tabContent}
      </TabControl>
    );
  }

  renderPrivacyLabel() {
    if (this.props.team.privacy === TeamPrivacyConstants.SECRET) {
      return (
        <div className="ml1 regular small border border-gray rounded dark-gray p1">Secret</div>
      );
    }
  }

  renderDefaultLabel() {
    if (this.props.team.isDefaultTeam) {
      return (
        <div className="ml1 regular small border border-gray rounded dark-gray p1">Default</div>
      );
    }
  }
}

export default Relay.createContainer(TeamShow, {
  fragments: {
    team: () => Relay.QL`
      fragment on Team {
        ${Pipelines.getFragment('team')}
        ${Members.getFragment('team')}
        members {
          count
        }
        pipelines {
          count
        }
        name
        description
        slug
        privacy
        isDefaultTeam
        organization {
          name
          slug
        }
        permissions {
          teamUpdate {
            allowed
          }
        }
      }
    `
  }
});
