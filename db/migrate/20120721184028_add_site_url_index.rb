class AddSiteUrlIndex < ActiveRecord::Migration
  def change
    add_index :sites, :url, unique: true
  end
end
