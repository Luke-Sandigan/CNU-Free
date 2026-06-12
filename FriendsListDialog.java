import javax.swing.*;
import java.awt.*;
import java.util.List;

public class FriendsListDialog extends JDialog {

    private List<Friend> friends;
    private MainDashboard parentFrame;
    private JPanel listPanel;

    public FriendsListDialog(MainDashboard parent, List<Friend> friends) {
        super(parent, "Manage Friends", true);
        this.parentFrame = parent;
        this.friends = friends;

        setSize(400, 500);
        setLocationRelativeTo(parent);
        setLayout(new BorderLayout());

        JPanel header = new JPanel(new BorderLayout());
        header.setBackground(new Color(50, 50, 50));
        
        JLabel title = new JLabel("  My Friends", SwingConstants.LEFT);
        title.setForeground(Color.WHITE);
        title.setFont(new Font("Arial", Font.BOLD, 18));
        title.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        
        JButton btnClose = new JButton("Close");
        btnClose.addActionListener(e -> dispose());
        
        header.add(title, BorderLayout.CENTER);
        header.add(btnClose, BorderLayout.EAST);
        add(header, BorderLayout.NORTH);

        listPanel = new JPanel();
        listPanel.setLayout(new BoxLayout(listPanel, BoxLayout.Y_AXIS));
        
        JScrollPane scroll = new JScrollPane(listPanel);
        add(scroll, BorderLayout.CENTER);

        refreshList();
    }

    private void refreshList() {
        listPanel.removeAll();

        if (friends.isEmpty()) {
            listPanel.add(new JLabel("   No friends added yet."));
        } else {
            for (Friend f : friends) {
                listPanel.add(createFriendRow(f));
                listPanel.add(Box.createVerticalStrut(5));
            }
        }
        
        listPanel.revalidate();
        listPanel.repaint();
    }

    private JPanel createFriendRow(Friend f) {
        JPanel row = new JPanel(new BorderLayout());
        row.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createMatteBorder(0, 0, 1, 0, Color.LIGHT_GRAY),
            BorderFactory.createEmptyBorder(10, 10, 10, 10)
        ));
        row.setMaximumSize(new Dimension(400, 60));

        JLabel nameLbl = new JLabel(f.getName());
        nameLbl.setFont(new Font("Arial", Font.BOLD, 14));
        row.add(nameLbl, BorderLayout.CENTER);

        JPanel btnPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT, 5, 0));
        
        JButton btnEdit = new JButton("Edit");
        JButton btnDelete = new JButton("Delete");
        
        btnDelete.addActionListener(e -> {
            int confirm = JOptionPane.showConfirmDialog(this, 
                "Are you sure you want to remove " + f.getName() + "?", 
                "Confirm Delete", 
                JOptionPane.YES_NO_OPTION,
                JOptionPane.WARNING_MESSAGE);
                
            if (confirm == JOptionPane.YES_OPTION) {
                boolean removed = friends.remove(f);

                if (removed) {
                    DataManager.saveData(friends); 
                    refreshList(); 
                    parentFrame.refreshFriendList(); 
                    JOptionPane.showMessageDialog(this, "Friend removed.");
                } else {
                    JOptionPane.showMessageDialog(this, "Error: Could not delete entry.", "Error", JOptionPane.ERROR_MESSAGE);
                }
            }
        });

        btnEdit.addActionListener(e -> {
             AddFriendDialog dialog = new AddFriendDialog(parentFrame, f);
             dialog.setVisible(true);

             if (dialog.isSucceeded()) {
                 Friend updatedFriend = dialog.getNewFriend();
                 int index = friends.indexOf(f);
                 if (index != -1) {
                     friends.set(index, updatedFriend);
                     DataManager.saveData(friends);
                     refreshList();
                     parentFrame.refreshFriendList();
                     JOptionPane.showMessageDialog(this, "Friend updated successfully!");
                 }
             }
        });

        btnPanel.add(btnEdit);
        btnPanel.add(btnDelete);
        row.add(btnPanel, BorderLayout.EAST);

        return row;
    }
}