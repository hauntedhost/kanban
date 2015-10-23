RSpec::Matchers.define :have_json do |record, serializer|
  match do |actual|
    json = serialize_json(record, serializer)
    expect(actual).to eq(json)
  end
end

def serialize_json(record, serializer)
  if record.respond_to?(:each)
    ActiveModel::ArraySerializer.new(
      record, each_serializer: serializer
    ).to_json
  else
    serializer.new(record).to_json
  end
end
