ActiveSupport.on_load(:active_model_serializers) do
  ActiveModel::ArraySerializer.root = false
end
