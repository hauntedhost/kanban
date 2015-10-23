require 'rails_helper'

module Api
  RSpec.describe BoardsController, type: :controller do
    before(:each) do
      request.env['HTTP_ACCEPT'] = 'application/json'
    end

    context 'as a guest user' do
      describe 'GET #index' do
        it 'requires login' do
          get :index
          expect(response).to require_login_for_api
        end
      end

      describe 'GET #show' do
        it 'requires login' do
          get :show, id: 1
          expect(response).to require_login_for_api
        end
      end

      describe 'POST #create' do
        it 'requires login' do
          post :create, board: {}
          expect(response).to require_login_for_api
        end
      end

      describe 'PATCH #update' do
        it 'requires login' do
          patch :update, id: 1, board: {}
          expect(response).to require_login_for_api
        end
      end
    end

    context 'as a logged in user' do
      let(:user) { create(:user) }
      let(:user2) { create(:user) }
      let!(:boards) { create_list(:board, 3, member: user) }
      let!(:boards2) { create_list(:board, 2, member: user2) }

      before(:each) { set_user_session(user) }

      describe 'GET #index' do
        it 'returns boards JSON for given user' do
          get :index
          expect(response).to have_http_status(:ok)
          expect(response.body).to have_json(user.boards, BoardSerializer)
        end

        it 'does not returns boards JSON for other users' do
          get :index
          expect(response).to have_http_status(:ok)
          expect(response.body).not_to have_json(user2.boards, BoardSerializer)
        end
      end

      describe 'GET #show' do
        context 'when logged in user is a member of board' do
          it 'shows board JSON' do
            board = user.boards.first
            get :show, id: board.id
            expect(response).to have_http_status(:ok)
            expect(response.body).to have_json(board, BoardSerializer)
          end
        end

        context 'when logged in user is not a member of board' do
          it 'raises 404' do
            board = user2.boards.first
            expect {
              get :show, id: board.id
            }.to raise_error(ActiveRecord::RecordNotFound)
          end
        end
      end

      describe 'POST #create' do
        it 'creates a new board'
      end

      describe 'PATCH #update' do
        it 'updates board'
      end
    end
  end
end
