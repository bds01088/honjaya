import React, { Component } from 'react';

import UserVideoComponent from './UserVideoComponent';

class UserReportModalMeeting extends Component {
  render() {
    const {openUserReportModal, closeUserReportModal, ReportInputsBlock } = this.props
    return (
      <div className= {openUserReportModal ? 'openModal modal' : 'modal'}>
        {openUserReportModal ? (
          <section>
            <header>
              <button className="closeUserReportModal" onClick={closeUserReportModal}></button>
            </header>
              { ReportInputsBlock }
          </section>
        ) : null}
      </div>
    );
  }
}

export default UserReportModalMeeting