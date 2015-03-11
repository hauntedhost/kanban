ActiveSupport.on_load(:active_model_serializers) do
  ActiveModel::Serializer.embed(:ids, include: true)
end
