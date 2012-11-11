class AddSiteIdentToSnapshots < ActiveRecord::Migration
  def change
    add_column :snapshots, :site_ident, :string
  end
end
