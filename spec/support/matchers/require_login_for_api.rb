RSpec::Matchers.define :require_login_for_api do |expected|
  match do |actual|
    expect(actual).to have_http_status(:unauthorized)
  end
end
